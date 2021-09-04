module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@modules": "./src/modules",
        "@config": "./src/config",
        "@shared": "./src/shared",
        "@middlewares": "./src/shared/http/middlewares",
        "@MainRoutes": "./src/shared/http/routes/index",
        /* Products path maps */
        "@ProductsEntities": "./src/modules/products/typeorm/entities",
        "@ProductsRepositories": "./src/modules/products/typeorm/repositories",
        "@ProductsServices": "./src/modules/products/services",
        "@ProductsControllers": "./src/modules/products/controllers",
        "@ProductsRoutes": "./src/modules/products/routes",
        /* Users path maps */
        "@UsersEntities": "./src/modules/users/typeorm/entities",
        "@UsersRepositories": "./src/modules/users/typeorm/repositories",
        "@UsersControllers": "./src/modules/users/controllers",
        "@UsersServices": "./src/modules/users/services",
        "@UsersRoutes": "./src/modules/users/routes",
        /* Customers path maps */
        "@CustomersEntities": "./src/modules/customers/typeorm/entities",
        "@CustomersRepositories": "./src/modules/customers/typeorm/repositories",
        "@CustomersServices": "./src/modules/customers/services",
        "@CustomersControllers": "./src/modules/customers/controllers",
        "@CustomersRoutes": "./src/modules/customers/routes",
        /* Orders path maps */
        "@OrdersEntities": "./src/modules/orders/typeorm/entities",
        "@OrdersRepositories": "./src/modules/orders/typeorm/repositories",
        "@OrdersServices": "./src/modules/orders/services",
        "@OrdersControllers": "./src/modules/orders/controllers",
        "@OrdersRoutes": "./src/modules/orders/routes"
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ],
  ignore: ["./src/__tests__", "./src/@types"]
}