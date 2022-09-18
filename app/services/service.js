function Service(){
    this.getListSanPham = function(){
        return axios({
            url: "https://6323f57b5c1b4357279d8e42.mockapi.io/api/products",
            method: "GET"
        })
    }

    this.postSanPham = function(product){
        return axios({
            url: "https://6323f57b5c1b4357279d8e42.mockapi.io/api/products",
            method: "POST",
            data: product
        })
    }

    this.deleteSanPham = function(id){
        return axios({
            url:"https://6323f57b5c1b4357279d8e42.mockapi.io/api/products/"+id,
            method:"DELETE"
        })
    }

    this.getSanPham = function(id){
        return axios({
            url:"https://6323f57b5c1b4357279d8e42.mockapi.io/api/products/"+id,
            method:"GET"
        })
    }

    this.putSanPham = function(user, id){
        return axios({
            url:"https://6323f57b5c1b4357279d8e42.mockapi.io/api/products/"+id,
            method:"PUT",
            data: user
        })
    }
}