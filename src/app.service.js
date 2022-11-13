import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  compute(arr) {
    console.log('doing smt');
    to_float_array(arr);

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
    let At = TransMatrix(a);
    a = MultiplyMatrix(At, a);
    b = MultiplyMatrix(At, b);

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
        x[i] = b[i][0];
        for (let j = 0; j < 6; j++) {
          if (i == j) continue;
          x[i] -= a[i][j] * x[j];
        }
        x[i] /= a[i][i];
        if (isNaN(x[i])) {
          computing = 0;
          break;
        }
        inaccuracy += Math.pow(x - x_i_old, 2);
      }
      if (inaccuracy <= eps) {
        computing = 0;
      }
    }

    let res = stringify_array(x);
    console.log(res);

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
    let res = a.split(' ').map(Number);
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
