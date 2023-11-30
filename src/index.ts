import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();

import './connection';
import './client';

process.on('unhandledRejection', (reason: Error, promise: Promise<unknown>) => {
  console.log(
    `Caught unhandled rejection: ${reason}\n\n${reason.name}\n\n${reason.message}\n\n${reason.stack}\n` +
      'Rejected promise:',
  );
  console.log(promise);
});
process.on('uncaughtException', (err, origin) => {
  console.log(
    `Caught exception: ${err}\n\n${err.name}\n\n${err.message}\n\n${err.stack}\n` +
      `Exception origin: ${origin}`,
  );
});
