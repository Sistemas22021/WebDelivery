# LosPollosHermanos

Aplicacion que tiene como objetivo agilizar el proceso de atencion a los clientes por medio de esta.

Esta compuesto por 3 aplicaciones 

1. Backend en NestJS TS
2. Frontend en ReactJS como formulario donde los clientes realizaran los pedios
3. Frontend en ReactJS como panel administrativo que le permitira a los encargados atender cada orden que va entrando.


# Instalacion
Para poder correr el proyecto en primer lugar deben instalarse las dependencias
`npm install`

Cada proyecto contiene un respectivo archivo .env, donde se deben especificar las credenciales respectiva para los servicios que se usan en los proyectos


# Dependencias
Para el correcto funcionamiento del backend y posterior, los frontend los cuales consultan este backend, debe inicializarse una base de datos en MYSQL
que contenga 3 tablas
1. order
2. client
3. dish
4. order_dish

En esta se estara almacenando la informacion de las ordenes entrantes y los platillos que disponga el restaurante en cuestion.

se proporciona un DDL con la estructura de la base de datos 

DDL: https://drive.google.com/drive/u/0/folders/1JBNrQibsLmm60pmRG9smfQvK2iKeVvSr

y un DML que contiene platillos.

DML: https://drive.google.com/file/d/1QY3GawGD5SPjO_4-jdxzwiKCRJKwu6EU/view?usp=drive_link

Adicionalmente a la configuracion del backend se le pueden asignar valores adicionales como las credenciales a un bot de telegram
se le provee un token de autenticacion y el id de un chat especifico, donde estara notificando la entrada de nuevas ordenes.

Tambien asignando las credenciales de un proyecto en firebase este al recibir una orden almacenara dichas ordenes tanto en MYSQL como en firebase.
este ultimo es importante, ya que la aplicacion desde donde se administran las ordenes, consume los datos en la base de datos en la nube, y luego hace peticiones
al backend en NESTJS para actualizar dicha informacion.

# Desarrollo

para correr el proyecto de forma local se deben correr los siguientes comandos

1. admin - aplicacion en react: *npx nx serve admin*
2. client: aplicacion en react: *npx nx serve client*
3. api: aplicacion en nestjs; *npx nx serve api*

# Build

Para construir estas aplicaciones y ser desplegadas en la nube
debe ejecutarse el comando build de forma
1. admin: *npx nx build admin*
2. client: *npx nx build client*
3. api: *npx nx build api*

las aplicaciones client y admin, no son construidas en la carpeta comun */dist/apps*
esto se hizo con la finalidad de facilitar el despliegue a la nube por separado,
estas aplicaciones se construyen en la carpeta /admin-build y /client-build respectivamente
dentro de cada una de ellas existe un directorio build, que es donde se encuentra el contenido de la aplicacion,
sin embargo en el directorio raiz, se encuentra la configuracion para el despliegue de cada una de las aplicaciones en un host especifico
este puede ser configurado para cualquier host con alguna cuenta especifica, solo debe configurarse y asignarse como carpeta de construccion
build, siempre y cuando se ejecute el comando de firebase para inicializar la configuracion del mismo, dentro de la carpeta /<proyecto>-build

# Pruebas
para realizar las pruebas correspondientes a cada proyecto se ejecutan los comandos
`npx nx test <nombre_proyecto>`

#Despliegue
Adicionalmente se creo un comando para realizar el despliegue de cada frontend especifico
utilizando el comando `npx nx deploy <nombre_proyecto>`, se intentara desplegar con la configuracion de firebase proporcionada
el contenido dentro de la carpeta `/<nombre_proyecto>/build`
Debe tomarse en cuenta que para hacer uso correcto de este comando, debe ejecutarse primero el build de cada aplicacion correspondiente
y crear una variable de entorno con el nombre `FIREBASE_TOKEN=<contenido>` ya que este sera el valor que tomara para autenticarse con firebase.

