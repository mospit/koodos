const express  = require  ('express');
const { createClient } = require  ('@supabase/supabase-js')
const dotenv = require  ('dotenv');
const serverless =  require('serverless-http');

dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());
const supabase = createClient(process.env.URL, process.env.API_KEY);
app.get('/',async (req, res) => {
    const { data, error } = await supabase
    .from('data')
    .select();
    
    res.send(data)
  })
  
  app.get('/:id', async (req, res)=> {
    const { data, error } = await supabase
.from('data')
.select();

    const id = req.params.id - 1;
    res.send(data[id]);
  });

  app.post('/', async (req, res) => {
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
