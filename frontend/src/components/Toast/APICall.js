import axios from "axios"

export const ByCityData = async (data) => {
    try {
        const SearchData=await axios.get(`https://api.openbrewerydb.org/v1/breweries/search?query=${data}&per_page=3`)
        const TypeData=await ByTypeData(data)
        if(!TypeData){
            return SearchData.data
        }else{
            return SearchData.data.concat(TypeData.data)
        }
    } catch (error) {
        console.log("APIError", error);
    }
}

export const ByTypeData=async(data)=>{

    try{
        const Typeres = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_type=${data}&per_page=3`)
        return Typeres
        
    }catch(err){
        if(err.response.status===400){
            return
        }else{
            console.log("APItype", err);
        }
    }
}
export const DataAPI=async(id)=>{

    try{
        const SingleData= await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
        return SingleData
        
    }catch(err){
        if(err.response.status===400){
            return
        }else{
            console.log("APItype", err);
        }
    }
}