const express  = require  ('express');
const { createClient } = require  ('@supabase/supabase-js')
const dotenv = require  ('dotenv');
const serverless =  require('serverless-http');

dotenv.config();
const app = express();
const router = express.Router();
const PORT = 8080;

app.use(express.json());
app.use('/home', home);
const supabase = createClient(process.env.URL, process.env.API_KEY);
router.get('/',async (req, res) => {
    const { data, error } = await supabase
    .from('data')
    .select();
    
    res.send(data)
  })
  
  router.get('/:id', async (req, res)=> {
    const { data, error } = await supabase
.from('data')
.select();

    const id = req.params.id - 1;
    res.send(data[id]);
  });

  router.post('/', async (req, res) => {
    const sequence = {id: "676"}
    const { data, error } = await supabase
    .from('data')
    .insert({sequence: req.body})
    
    res.status(200).send(req.body);
    res.end();
  })

app.listen(PORT, () => {
  console.log(`Listenig on http://localhost:${PORT}`)
})
