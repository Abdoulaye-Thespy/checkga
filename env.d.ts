// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      MYAWS_REGION?: string;
      MYAWS_ACCESS_KEY_ID?: string;
      MYAWS_SECRET_ACCESS_KEY?: string;
    }
  }