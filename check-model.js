const API_KEY = 'AIzaSyAB_aSDYzLS-qumL_o676a6uDTfzc_cHng'; // Your API key

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    console.log('Available Models:');
    data.models?.forEach((model) => {
      console.log(`- ${model.name}`);
      console.log(
        `  Supports: ${model.supportedGenerationMethods?.join(', ')}`
      );
    });
  })
  .catch((err) => console.error('Error:', err));
