import { Injectable } from '@nestjs/common';
import { Pengiriman } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { held_karp } from '../lib/lib';
import { nextTick } from 'node:process';
import axios from 'axios';

@Injectable()
export class PengirimanService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Pengiriman[]> {
    return this.prisma.pengiriman.findMany();
  }

  async findOne(id: string): Promise<Pengiriman> {
    return this.prisma.pengiriman.findFirst({
      where: {
        id,
      },
      include: {
        barang: true,
        kantor: true,
        kurir: true,
      },
    });
  }

  async create(pengiriman: Pengiriman): Promise<Pengiriman> {
    return this.prisma.pengiriman.create({
      data: pengiriman,
    });
  }

  async update(id: string, pengiriman: Pengiriman): Promise<Pengiriman> {
    return this.prisma.pengiriman.update({
      where: {
        id,
      },
      data: pengiriman,
    });
  }

  async delete(id: string): Promise<Pengiriman> {
    return this.prisma.pengiriman.delete({
      where: {
        id,
      },
    });
  }

  async hitung(id: string) {
    console.log('mengitung');

    const getPengiriman: any = await this.prisma.pengiriman.findFirst({
      where: {
        id,
      },
      include: {
        barang: true,
        kurir: true,
        kantor: true,
      },
    });

    // const openRouteServiceBaseURL =
    //   'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62486e28e8e12a3449528def1afa9a4401df&';
    const openRouteServiceBaseURL =
      'http://0.0.0.0:8080/ors/v2/directions/driving-car?&';
    nextTick(async () => {
      // const get = await axios.get(openRouteServiceBaseURL);
      const getBarang = getPengiriman.barang;

      const distanceMatrix: number[][] = [];
      const barangMatrix: string[][] = [];
      const coordinatesDirection: any[][] = [];

      const kantor = getPengiriman.kantor;

      const barang = [kantor].concat(getBarang);
      for (let x = 0; x < barang.length; x++) {
        const innerArray = [];
        const innerArray2 = [];
        const innerArray3 = [];
        for (let y = 0; y < barang.length; y++) {
          innerArray.push(0);
          innerArray2.push(0);
          innerArray3.push(0);
        }
        distanceMatrix.push(innerArray);
        barangMatrix.push(innerArray2);
        coordinatesDirection.push(innerArray3);
      }

      for (let x = 0; x < barang.length; x++) {
        for (let y = 0; y < barang.length; y++) {
          if (barang[x] === barang[y]) {
            continue;
          }
          const url =
            openRouteServiceBaseURL +
            'start=' +
            barang[x].koordinat.longitude +
            ',' +
            barang[x].koordinat.latitude +
            '&end=' +
            barang[y].koordinat.longitude +
            ',' +
            barang[y].koordinat.latitude;

          const distance = await axios.get(url);

          coordinatesDirection[x][y] =
            distance.data.features[0].geometry.coordinates;

          distanceMatrix[x][y] = Math.ceil(
            distance.data.features[0].properties.segments[0].distance,
          );
          barangMatrix[x][y] = barang[x].kode + ' & ' + barang[y].kode;
        }
      }

      console.table(barangMatrix);
      // console.table(distanceMatrix);

      const calculate = held_karp({
        distance: distanceMatrix,
      });

      const urutanTujuan = new Array(calculate.path.length);
      const directions = [];

      for (const i in calculate.path) {
        if (Number(i) > 0) {
          // x y
          directions.push(
            coordinatesDirection[calculate.path[Number(i) - 1]][
              calculate.path[i]
            ],
          );
        }
        urutanTujuan[calculate.path[i]] = barang[i]?.kode;
      }

      // hapus id kantor
      urutanTujuan.shift();

      const updatePengiriman = await this.prisma.pengiriman.update({
        where: {
          id,
        },
        data: {
          rute: calculate.path,
          cost: calculate.cost,
          metrikJarak: distanceMatrix,
          urutanKodeBarang: urutanTujuan,
          directions: JSON.stringify(
            directions.map((val) =>
              val?.map((res) => ({ longitude: res[0], latitude: res[1] })),
            ),
          ),
        },
        include: {
          barang: true,
          kurir: true,
        },
      });
    });
    return {
      status: 'success',
      message: 'perhitungan dijalankan',
    };
  }

  async getAllByKurir(id: string): Promise<Pengiriman[]> {
    return this.prisma.pengiriman.findMany({
      where: {
        kurir: {
          id: id,
        },
      },
    });
  }
}
