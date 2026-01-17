import Application from './App';

const app = new Application();

const shutdown = async (signal: string) => {
  console.log(`${signal} signal received`);
  try {
    await app.stop();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

app.start().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
