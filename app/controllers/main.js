var service = new Service();
var dssp = new ProductList();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  getEle("loader").style.display = "block";
  service
    .getListSanPham()
    .then((result) => {
      renderHTML(result.data);
      dssp.array = result.data;
      getEle("loader").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();
function renderHTML(data) {
  var content = "";

  data.forEach((sp, index) => {
    content += `<tr>
    <td>${index + 1}</td>
    <td>${sp.name}</td>
    <td>${sp.price}</td>
    <td>
      <img style="height: 80px; width: 80px;" class="img-fluid"
        src="${sp.img}" alt="">
    </td>
    <td>
      <p>${sp.desc}</p>
    </td>
    <td>
      <p>${sp.type}</p>
    </td>
    <td>
      <button onclick="editSanPham(${
        sp.id
      })" class="btn btn-primary me-2" data-bs-toggle="modal"
      data-bs-target="#exampleModal">Edit</button>
      <button onclick="xoaSanPham(${
        sp.id
      })" class="btn btn-warning">Delete</button>
    </td>
  </tr>`;
  });

  getEle("tableData").innerHTML = content;
}

function layThongTinSanPham(isAdd) {
  var name = getEle("txtName").value;
  var price = getEle("txtPrice").value;
  var screen = getEle("txtScreen").value;
  var backCamera = getEle("txtBackCamera").value;
  var frontCamera = getEle("txtFrontCamera").value;
  var img = getEle("txtImg").value;
  var desc = getEle("txtDesc").value;
  var type = getEle("txtLoai").value;

  var isValid = true;
  if(isAdd){
    // Validation Name
  isValid &=
  validation.kiemTraRong(name, "tbName", "(*)Name không được bỏ trống") &&
  validation.kiemTraDienThoaiDaTonTai(
    name,
    "tbName",
    "(*)Tên điện thoại này đã tồn tại"
  );
  }
  // Validation Price:
  isValid &=
    validation.kiemTraRong(price, "tbPrice", "(*)Price không được trống") &&
    validation.kiemTraSo(price, "tbPrice", "(*)Price phải là số nguyên") &&
    validation.kiemTraSoTien(
      price,
      "tbPrice",
      "(*)Price phải từ 1000$ đến 50000$"
    );
  // Validation Screen
  isValid &= validation.kiemTraRong(screen,"tbScreen","(*)Screen không được bỏ trống");
  // Validation BackCamera 
  isValid &= validation.kiemTraRong(backCamera,"tbBackCamera","(*)BackCamera không được bỏ trống");
  // Validation FrontCamera
  isValid &= validation.kiemTraRong(frontCamera,"tbFrontCamera","(*)FrontCamera không được bỏ trống");
  // Validation Img
  isValid &= validation.kiemTraRong(img,"tbImg","(*)Img không được bỏ trống");
  //Validation Desc
  isValid &= validation.kiemTraRong(desc,"tbDesc","(*)Desc không được bỏ trống");
  // Validation Type
  isValid &= validation.checkSelectOption("txtLoai","tbLoai","(*)Chưa chọn loại điện thoại");
  if (!isValid) return null;

  var product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  return product;
}

getEle("btnThemSanPham").addEventListener("click", () => {
  getEle("txtName").disabled = false;
  resetModal();
  resetValidationModal();
  getEle("exampleModalLabel").innerHTML = "Thêm sản phẩm mới";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick="themSanPham()" type="button" class="btn btn-primary">Thêm sản phẩm</button>`;
});

function themSanPham() {
  var product = layThongTinSanPham(true);
  if (product) {
    service
      .postSanPham(product)
      .then((result) => {
        fetchData();
        document.getElementsByClassName("btn-close")[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function resetModal() {
  getEle("txtName").value = "";
  getEle("txtPrice").value = "";
  getEle("txtScreen").value = "";
  getEle("txtBackCamera").value = "";
  getEle("txtFrontCamera").value = "";
  getEle("txtImg").value = "";
  getEle("txtDesc").value = "";
  getEle("txtLoai").value = "";
}
function resetValidationModal() {
  getEle("tbName").style.display = "none";
  getEle("tbPrice").style.display = "none";
  getEle("tbScreen").style.display = "none";
  getEle("tbBackCamera").style.display = "none";
  getEle("tbFrontCamera").style.display = "none";
  getEle("tbImg").style.display = "none";
  getEle("tbDesc").style.display = "none";
  getEle("tbLoai").style.display = "none";
}

function xoaSanPham(id) {
  service
    .deleteSanPham(id)
    .then(() => {
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function editSanPham(id) {
  resetValidationModal();
  getEle("txtName").disabled = true;
  getEle("exampleModalLabel").innerHTML = "Cập nhật sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick="capNhatSanPham(${id})" type="button" class="btn btn-success">Cập nhật sản phẩm</button>`;

  service
    .getSanPham(id)
    .then((result) => {
      getEle("txtName").value = result.data.name;
      getEle("txtPrice").value = result.data.price;
      getEle("txtScreen").value = result.data.screen;
      getEle("txtBackCamera").value = result.data.backCamera;
      getEle("txtFrontCamera").value = result.data.frontCamera;
      getEle("txtImg").value = result.data.img;
      getEle("txtDesc").value = result.data.desc;
      getEle("txtLoai").value = result.data.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

function capNhatSanPham(id) {
  var product = layThongTinSanPham(false);
  if(product){
    service
    .putSanPham(product, id)
    .then(() => {
      fetchData();
      document.getElementsByClassName("btn-close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
