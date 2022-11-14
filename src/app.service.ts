import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  compute(arr) {
    this.to_float_array(arr);

    let a = [], b = [];
    for (let i = 0; i < 6; i++) {
      a.push([]);
      for (let j = 0; j < 6; j++) {
        a[i].push(arr[7 * i + j]);
      }
      b.push([]);
      b[i][0] = arr[7 * i + 6];
    }

    // приведение исходной матрицы к нормальному виду
    let At = this.TransMatrix(a);
    let a2 = this.MultiplyMatrix(At, a);
    let b2 = this.MultiplyMatrix(At, b);

    // вычисление решения
    let x = [0, 0, 0, 0, 0, 0];
    let computing = 1000;
    let x_i_old, inaccuracy;
    let dec_len = 6;
    let eps = 1 / Math.pow(10, dec_len * 2);

    while (computing--) {
      for (let i = 0; i < 6; i++) {
        inaccuracy = 0;
        x_i_old = x[i];
        x[i] = b2[i][0];
        for (let j = 0; j < 6; j++) {
          if (i == j) continue;
          x[i] -= a2[i][j] * x[j];
        }
        x[i] /= a2[i][i];
        if (isNaN(x[i])) {
          computing = 0;
          break;
        }
        inaccuracy += Math.pow(x[i] - x_i_old, 2);
      }
      if (inaccuracy <= eps) {
        computing = 0;
      }
    }

    let res = this.stringify_array(x);

    return res;
  }

  stringify_array(arr) {
    let res = "";
    for (let i = 0; i < arr.length; i++) {
      res += arr[i];
      res += " ";
    }
    return res;
  }

  to_float_array(str) {
    let res = str.split(' ').map(Number);
    return res;
  }

  TransMatrix(A) //На входе двумерный массив
  {
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++) {
      AT[i] = [];
      for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
    }
    return AT;
  }

  MultiplyMatrix(A, B) {
    var rowsA = A.length, colsA = A[0].length,
      rowsB = B.length, colsB = B[0].length,
      C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++) {
      for (var i = 0; i < rowsA; i++) {
        var t = 0;
        for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
        C[i][k] = t;
      }
    }
    return C;
  }
}
