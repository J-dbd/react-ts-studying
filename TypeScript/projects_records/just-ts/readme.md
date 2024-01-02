# node - nodemon in ts

nodemon과 node-ts로 세팅해두는 방법(https://radlohead.gitbook.io/typescript-deep-dive/nodejs)

# handbooks

공식 핸드북 https://www.typescriptlang.org/ko/docs/handbook/typescript-in-5-minutes.html

typescript deep dive https://radlohead.gitbook.io/typescript-deep-dive/type-system/intro/d.ts

# error기록

HB: 해당 인터페이스에 맞지 않는 객체를 생성하면 TypeScript는 경고를 줍니다.

```javascript
// @errors: 2322
interface User {
  name: string;
  id: number;
}
const user: User = {
  username: "Hayes",
  id: 0,
};
```

error message in nodemon

```
C:\(...)\00. frontstudy week1213\TypeScript\projects\just_ts\node_modules\ts-node\src\index.ts:859
    return new TSError(diagnosticText, diagnosticCodes, diagnostics);
           ^
TSError: ⨯ Unable to compile TypeScript:
src/index.ts:24:3 - error TS2322: Type 'number' is not assignable to type 'string'.

24   name: 1,
     ~~~~

  src/index.ts:17:3
    17   name: string;
         ~~~~
    The expected type comes from property 'name' which is declared here on type 'User'

    at createTSError (src\index.ts:859:12)
    at reportTSError (src\index.ts:863:19)
    at getOutput (src\index.ts:1077:36)
    at Object.compile (src\index.ts:1433:41)
    at Module.m._compile (src\index.ts:1617:30)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Object.require.extensions.<computed> [as .ts] (src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12) {
  diagnosticCodes: [ 2322 ]
}
```
