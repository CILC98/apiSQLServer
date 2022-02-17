import { config } from "dotenv"
config();

export default{
    port: process.env.PORT || 3000,
    bdUser: process.env.BD_USER || '',
    bdPassword: process.env.BD_PASSWORD || '',
    bdServer: process.env.BD_SERVER || ''
}