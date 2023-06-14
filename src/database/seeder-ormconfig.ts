export default {
    type: 'sqlite' as const,
    database: 'database.sqlite',
    entities: [
        "**/*.entity.ts",
    ],
}
