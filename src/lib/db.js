const { DB_USERNAME, DB_PASSWORD } = process.env;
export const connectionStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.apazcnp.mongodb.net/zwembadvergelijkerNL?retryWrites=true&w=majority`;
