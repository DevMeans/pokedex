<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Apuntes nest

1.  clonar el repositorio
2.  ejecutar

```
npm i
```

3. Tener nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. Clonar el archivo **.env.template** y renombrar la copia a **.env**
6. Llenar las variables de entorno definidas en el `.env`
7. Ejecutar seed para generar datos

```
localhost:3000/api/v2/seed
```

## Stack usado

- MongoDB
- Nest
