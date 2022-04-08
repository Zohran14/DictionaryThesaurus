import axios, { AxiosResponse } from 'axios';
/*eslint no-loop-func: "error"*/
/*eslint-env es6*/
//let words: Array<string> = ["clapboard", "repel", "palpable", "abrasion", "impose", "sylvan", "mason", "puncture", "emaciated", "furor", "void", "frivolous", "fracas", "negate", "barren", "friction", "decree", "invalid", "hindrance", "decry", "intelligible", "archive", "rebuff", "arid", "bower"]

export const definition = async (words: Array<string>, ref: HTMLIonTextElement) => {
    const urls: any = []
    words.forEach(word => {
        urls.push(axios.get<any[]>("https://api.dictionaryapi.dev/api/v2/entries/en/" + word, {validateStatus: function (status) {
            return true; // Resolve only if the status code is less than 500
          }}));
    })
    axios.all<AxiosResponse<any[] | {title: string, message: string, resolution: string}>>(urls).then(axios.spread((...responses) => {
        responses.forEach((response, index) => {
            const word = words[index];
            var data = "";
            if (response.data.constructor === Array)  {
                response.data.forEach((def: any) => {
                    def.meanings.forEach((mean: any) => {
                        mean.definitions.forEach((def2:any) => {
                            data += def2.definition;
                            data += " "
                        })
                    })
                })
                ref.innerHTML += (`${word}<br>Def:${data}<br><hr><br>`);
            } else {
                ref.innerHTML += `${word} not found<br><hr><br>`; 
            }
        })
    })).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
}
export const thesaurus = (words: Array<string>, ref: HTMLIonTextElement): void => {
    const urls: any = []
    words.forEach(word => {
        urls.push(axios.get<any[]>(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=528e4bd3-1f89-43ff-8f99-fa14d9be8252`));
    })
    axios.all<AxiosResponse<any[]>>(urls).then(axios.spread((...responses) => {
        responses.forEach((response, index) => {
            const word = words[index];
                if (response.data.length >= 1 && (Object.keys(response.data[0])[0] === "meta")) {
                    var opp = ""
                    var syn = ""
                    response.data.forEach((element) => {
                        if (element.meta.syns) {
                            element.meta.syns.forEach((element1: any[]) => {
                                if (element1.length > 5) {
                                    element1 = element1.slice(0, -(element1.length - 5));
                                }
                                element1.forEach((element: any) => {
                                    syn += `${element}, `;
                                });
                            });
                        }
                        if (element.meta.ants) {
                            element.meta.ants.forEach((element1: any[]) => {
                                if (element1.length > 5) {
                                    element1 = element1.slice(0, -(element1.length - 5));
                                }
                                element1.forEach((element: any) => {
                                    opp += `${element}, `;
                                });
                            });
                        }

                    })
                    
                    ref.innerHTML += (`${word}<br>Synonyms: ${syn.slice(0,-2)}<br>Antonyms: ${opp.slice(0,-2)}<br><hr><br>`);
                }
                if ((typeof response.data[0] === "string") || (response.data.length === 0)) {
                    ref.innerHTML += `${word} not found<br><hr><br>`;
                }
        })
    }))
}