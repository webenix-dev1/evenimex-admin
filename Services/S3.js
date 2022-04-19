console.log("Process ::", process.env.NEXT_AWS_ACCESS_KEY);
const S3 = {
  accessKeyId: process.env.NEXT_AWS_ACCESS_KEY || "AKIAYKZO5MLV5FYRPT3Z",
  secretAccessKey:
    process.env.NEXT_AWS_SECRET_KEY ||
    "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",
};

export default S3;
