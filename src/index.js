import app from './app'

//Puerto a escucharobteniendo la configuración
app.listen(app.get('port'))


console.log('Server on port',app.get('port'));