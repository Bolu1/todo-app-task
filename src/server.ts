const app = require ('./app')
import colors from 'colors'

const PORT = process.env.PORT|| 8080

app.listen(PORT, ()=>{
    
    console.log(colors.random(`Application Listening at http://localhost:${PORT}`))
})
