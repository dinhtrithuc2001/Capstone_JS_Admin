function Validation(){
    this.kiemTraRong = (value, errorId, mess) => {
        if(value !== ""){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML="";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML=mess;
        return false;
    }

    this.kiemTraDienThoaiDaTonTai = (value, errorId, mess) => {
        var status = dssp.array.some((sp) => {
            return value === sp.name;
          });
          if (!status) {
            // true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
          }
          // false
          getEle(errorId).style.display = "block";
          getEle(errorId).innerHTML = mess;
          return false;
    }
    this.kiemTraDoDaiKyTu = function (value, errorId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
          //true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        // false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      };
      this.checkSelectOption = (selectId, errorId, mess) => {
        if (getEle(selectId).selectedIndex !== 0) {
          // true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        // false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      };
      this.kiemTraSo = function(value, errorId, mess){
        var letter = /^[0-9]+$/;
        if(value.match(letter)){
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      }
      this.kiemTraSoTien = function(value, errorId, mess){
        if( 1000 <= value && value <= 50000 ){
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      }
}