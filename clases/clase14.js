//borrar coleccion: db.nombre_colceccion.drop() ej; db.usuarios.drop()
//borra base de datos actual: db.dropDatabase()
//db.collection.estimatedDocumentCount() Cuenta el estimado más próximo  al número de documentos según su metadata.
//db.collection.countDocuments(opt) Cuenta los documentos que cumplan con el criterio definido en las opciones (opt).


//Sort: funciona para ordenar por uno o mas valores 1 ascendente, -1 descendente
//db.collection.find().sort({val_A:1,val_B:-1})

//Skip: omite el numero de documentos indicados
//.skip(offset)

//Limit: Limita el número de documentos devueltos.
//.limit(num) 

//Proyecciones: Si tenemos un documento con 100 propiedades, podemos definir sólo las propiedades que queremos obtener. find(query, projection)
//db.users.find({},{name:1}); Lo cual indica que, el campo “name” es el único que necesitamos obtener por parte del documento

//operadores
//$or, &and, $gt, lt, $gte (mayor o igual), $lte (menor o igual), $ne (distinto de),
//Ejemplo: db.estudiantes.find( {$or: [{nombre: "Juan"}, {nombre: "Lucia"}]} )
//db.estudiantes.find({ edad: { $gt: 25 } }) muestra mayores a 25
//db.estudiantes.find({ edad: { $gt: 25, $lt: 36 } }) entre 25 y 36

//update

//db.estudiantes.updateOne({nombre: "Fede"}, {$set: {edad: 36}}) primer parametro a quien y segundo lo que queremos cambiar

//db.estudiantes.updateMany({edad: 25}, {$inc: {edad: 1}}) a todos los de 25 los incremento en 1 la edad

//delete

//db.estudiantes.deleteMany({nombre: "Juan"})