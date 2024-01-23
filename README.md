# Encadenamiento de API con TypeScript y Framework "NestJS".

	En este proyecto, creo de ejemplo el encadenamiento de API utilizando el framework NestJS junto con TypeScript.	
	La elección de NestJS se basa en que también se está trabajando ese tema, su capacidad para trabajar con TypeScript 
	y su enfoque modular, lo que beneficia a detallar mejor el ejemplo para si luego 
	deseo implementarlo en un proyecto TS utilizando la misma lógica y estructura de carpetas.

	## Motivación

	La decisión de utilizar NestJS en lugar de otras opciones se basa en la integración 
	natural con TypeScript y en la facilidad que proporciona para trabajar con servicios, controladores y módulos.
	Cumpliendo así con el objetivo de encadenar solicitudes a APIs 
	externas obteniendo datos asignados.

	## AXIOS y FETCH

	Se implementa el encadenamiento de API con dos enfoques para realizar solicitudes a API externas.

	## Inyección de Dependencias

	Se utiliza este concepto para manejar la creación y gestión de instancias de servicios, tambien permite 
	una integración suave de servicios como AXIOS o FETCH en los controladores y servicios de la app.
	
	## Estructuracion de carpetas
	
	Cree mi proyecto de una manera estructurada diciendo las implementaciones que se usaran de los diferentes service, 
	controller que se puedan usar en la API así tambien como otros archivos aparte que contienen constantes o interfaces que se usan dentro de los demás services.


	## Implementación
        
			//http/http.module.ts
	**Paso: 1
	Primero en mi module secundario cargo los services, providers y controller que necesitare para realizar el ejemplo, 
	puesto que el module principal no lo todo y solo importo mi Module "http".
	También cree una sub carpeta para dividir lo que sería ese Module y así tener mejor estructurado el ejemplo.

			//http/http.service.ts
	**Paso: 2
	Luego cree un service para manejar la lógica de hacer solicitudes HTTP utilizando Axios y Fetch.
	Empiezo importando las bibliotecas que usare algo fundamental en cada paso que se trabaje, haciendo uso del
	{ Inyectable } , CircularJSON , y demás Services que se verán paso a paso.
	
	'Línea: 6 Hacemos uso del decorador de la biblioteca { Inyectable } para marcar la clase como un proveedor inyectable.
	Mas adelante dentro de mi clase HttpService, creo dentro de ella una propiedad privada que se utilizara para 
	realizar solicitudes HTTP como tal me falto la creación de su interface para tipar:
	
	Quedaría con la interface propuesta:
	
	httpClient: HttpClient; 		
	
	export interface HttpClient {
   	 get(url: string): Promise<any>;
     	}

	'Luego creo un Constructor donde se Inyectarán los servicios de AxiosClient y FetchClient para este ejemplo.
	 Se establece la propiedad this.httpClient, donde se implementa la selección de HTTP_CLIENT_IMPLEMENTATION.
	
	'Línea 22: En el método fetchData realizara la lógica para hacer las solicitudes HTTP dependiendo de la 
	 implementación seleccionada.
	 Según la implementación asignada se utilizará diferente service para la realización de la solicitud y devuelve 
	 una estructura de datos formateada.

		**En la Promise<any>, luego implemento una interface para tipar el dato y así recibir dichos valores en Postman.
	 
	export interface ApiResponse {
   	 	client: string;
    		data: string;  
  	}
	
			**El uso de CircularJSON.stringify(fetchResponse), producirá una cadena de texto que representa 
			  la estructura de datos del objeto en formato JSON.
			**Es la forma de convertir el objeto en una cadena de texto que se puede almacenar, 
			  enviar por la red o mostrar en algún HTML o uso en API.
			
			//http/http.config.ts
			**Se crea un archivo que contendrá las opciones de AXIOS O FETCH.
		
		export const HTTP_CLIENT_IMPLEMENTATION: 'fetch' | 'axios' = 'fetch'; 
		Haciendo uso de los Tipos literales almacenamos en la const las implementaciones que se asignaran.	
		Aquí podremos cambiar la implementación según convenga, así abstrayendo dicho código.
	
	**Paso: 3
			//http/http.controller.ts
	
	 Comenzando con el controller hacemos uso del import para traer bibliotecas y clases de servicios que se requieren, algo básico.
	
	'Línea 7: Agrego el decorador que reconocerá mi controller, dentro de la clase agrego mi constructor para inyectar el HttpService 
	 con el que trabajara mi controller directamente.
	'Agrego el decorador @Get el cual contiene un método que manejara las solicitudes HTTP tipo GET hacia mi ruta.
	
			Agregando una ruta distinta se accede a la información de episodios de la API.
		Usando: @Get('/api/character') accedemos a la lista de episodios de la API.

	'Usando el async con el método getData se verifica la implementación del cliente HTTP configurada en el config.ts, 
	 Se utiliza el método fetchData del servicio HttpService para realizar la solicitud HTTP a la API de Rick and Morty.
	La URL de la solicitud depende de si se está utilizando "axios" o "fetch".
			Cambiando la URL accedemos a los episodios de Rick and Morty.
		Usando: URL: https://rickandmortyapi.com/api/character
	'Los datos de la respuesta se estructuran en un objeto para convertirse a JSON, al final solo un mensaje de error por ambos casos del cliente y respuesta.

	**PASO: 4
			//services/axios-client/axios-client.ts
	
	'Se importan las bibliotecas y demás...
	'Defino el servicio con Decorador "@Inyectable" para que se pueda usar en el http.service.ts
	'Dentro de la clase declaro una propiedad de tipo Any puesto que la biblioteca de AXIOS
	 no da un tipo específico para su instancia.
	'Ahora dentro del constructor uso el this.client para hacer la referencia a la biblioteca AXIOS y realizar solicitudes HTTP.
	'Esto permite que cualquier instancia de AXIOSCLIENTSERVICE utilice AXIOS para realizar solicitudes.
	'En el método get utilizando la instancia de AXIOS.
	'Toma la URL como parámetro y devuelve la promesa resultante de la llamada a 'axios.get(url)'.

			//services/axios-client/axios-client.ts

	'Importación de bibliotecas y services requeridos...
	'@Inyectable para la clase FetchClientService para utilizarlo dentro del htt.service.ts
	'Se declara una propiedad privada 'useFetch' de tipo 'boolean' que determina si se debe utilizar la API natica 'fetch'
	 para realizar solicitudes HTTP.
	'Constructor: Se inicializar la propiedad 'useFetch' en 'true', indicando que se debe utilizar la API nativa'fetch'.
	'Método async 'get', este método realiza la solicitud HTTP GET usando 'fetch' que toma como parámetro la URL y devuelve la promesa resultante llamada a fetch(url).
	'Verificación de la Respuesta: Se verifica si el COD de estado es 200, si es así, verifica el tipo de contenido en 'content-type'.
	'Manejo del contenido con JSON.
	'Por último manejo de error a la solicitud por si algo sale mal.

	 ##Conclusiones
	
	En este ejemplo redactado y puesto a prueba explore el concepto de encadenamiento de API utilizando TS y NESTJS.
	Aplicando el uso de la Inyección de Dependencias y abstracción dentro del código para mejor reutilización.
	La aplicación de ambas bibliotecas como axios y fetch me dio a entender mejor la manera en que trabajan las APIs.


