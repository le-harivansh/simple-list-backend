module.exports = {
    type: 'sqlite',
    database: '../../database.sqlite',
    entities: [
        "dist/**/*.entity.{ts,js}",
        __dirname + "/../**/*.entity.{ts,js}",
    ],
}
