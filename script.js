let cart = []; // Giỏ hàng ban đầu rỗng

// Hàm cập nhật giỏ hàng
const updateCart = () => {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Kiểm tra phần tử có tồn tại
    if (!cartCount || !cartItems || !cartTotal) return;

    cartCount.textContent = cart.length; // Cập nhật số lượng giỏ hàng
    cartItems.innerHTML = ''; // Xóa nội dung giỏ hàng cũ

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Giá: <span class="item-price">${item.price}</span> VND</p>
                    <label for="quantity">Số lượng:</label>
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" onchange="updateItemQuantity(${item.id}, this.value)">
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Xóa</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `${total} VND`; // Cập nhật tổng tiền
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, chỉ tăng số lượng
        existingProduct.quantity += 1;
    } else {
        // Nếu chưa có, thêm sản phẩm mới
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id); // Loại bỏ sản phẩm theo ID
    updateCart(); // Cập nhật lại giao diện giỏ hàng
};

const searchInput = document.getElementById('searchInput');
const productItems = document.querySelectorAll('.product-item');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Biến lưu trữ chỉ số sản phẩm đã hiển thị
let displayedCount = 0;
const maxDisplayCount = 5; // Số sản phẩm hiển thị tối đa mỗi lần

// Hàm debounce để giảm tần suất tìm kiếm
let debounceTimer;
searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
        const searchQuery = searchInput.value.toLowerCase();
        displayedCount = 0; // Đặt lại đếm khi tìm kiếm lại

        // Lặp qua các sản phẩm và kiểm tra xem sản phẩm có phù hợp với từ khóa không
        productItems.forEach((item, index) => {
            const productName = item.textContent.toLowerCase();

            if (productName.includes(searchQuery)) {
                // Hiển thị sản phẩm nếu phù hợp
                if (displayedCount < maxDisplayCount) {
                    item.style.display = 'block';
                    displayedCount++;
                } else {
                    item.style.display = 'none'; // Ẩn các sản phẩm chưa hiển thị
                }
            } else {
                item.style.display = 'none'; // Ẩn sản phẩm không khớp
            }
        });

        // Kiểm tra và hiển thị nút "Xem thêm"
        if (displayedCount < maxDisplayCount) {
            loadMoreBtn.style.display = 'none'; // Nếu ít hơn 5 sản phẩm, ẩn nút
        } else {
            loadMoreBtn.style.display = 'inline-block'; // Hiển thị nút "Xem thêm"
        }
    }, 300); // Đợi 300ms sau khi người dùng dừng gõ
});

// Xử lý sự kiện "Xem thêm"
loadMoreBtn.addEventListener('click', function() {
    const searchQuery = searchInput.value.toLowerCase();

    productItems.forEach((item, index) => {
        const productName = item.textContent.toLowerCase();

        if (productName.includes(searchQuery)) {
            // Hiển thị thêm sản phẩm khi nhấn "Xem thêm"
            if (item.style.display === 'none') {
                item.style.display = 'block';
                displayedCount++;
            }
        }
    });

    // Nếu tất cả sản phẩm đã hiển thị, ẩn nút "Xem thêm"
    if (displayedCount === productItems.length) {
        loadMoreBtn.style.display = 'none';
    }
});


const products = [
    {
        id: 1,
        name: "Bánh Anh Đào",
        image: "li.avif",
        price: "200,000 VNĐ",
        description: "Bánh ngọt tươi mới, thơm ngon, phù hợp cho mọi dịp."
    },
    {
        id: 2,
        name: "Bánh Socola",
        image: "sôc.avif",
        price: "200,000 VNĐ",
        description: "Bánh ngọt với hương vị đặc biệt, mềm mịn, ngon miệng."
    },
    {
        id: 3,
        name: "Bánh Chanh Vàng",
        image: "chanh.avif",
        price: "250,000 VNĐ",
        description: "Bánh ngọt này có vị ngọt thanh, thơm nức, là lựa chọn tuyệt vời cho những ai yêu thích bánh ngọt."
    },
    {
        id: 4,
        name: "Bánh Xoài, Lá Dứa",
        image: "xoai.avif",
        price: "200,000 VNĐ",
        description: "Bánh ngọt này có vị ngọt thanh của xoài, hương lá dứa tươi và lớp kem phô mai."
    },
    {
        id: 5,
        name: "Bánh Cherry",
        image: "cherry.avif",
        price: "300,000 VNĐ",
        description: "Bánh ngọt này có vị mọng nước, đậm vị cherry."
    },
    {
        id: 6,
        name: "Bánh Vani",
        image: "vani.avif",
        price: "300,000 VNĐ",
        description: "Bánh ngọt này có vị vani kết hợp với anh đào và dâu tây."
    },
    {
        id: 7,
        name: "Bánh Socola Trắng",
        image: "socola trang.avif",
        price: "200,000 VNĐ",
        description: "Bánh ngọt này có vị Đậm đà vị trà Earl Grey, kết hợp socola"
    },
    {
        id: 8,
        name: "Phụ kiện Happy Birthday",
        image: "hp.avif",
        price: "30,000 VNĐ",
        description: "Chất liệu mica dày 2mm"
    },
    {
        id: 9,
        name: "Phụ kiện Nến",
        image: "nen.avif",
        price: "15,000 VNĐ",
        description: "06 chiếc nến xoắn, cao 16cm và phủ nhũ vàng đồng."
    },
    {
        id: 10,
        name: "Phụ kiện Thiệp",
        image: "thiep.avif",
        price: "12,000 VNĐ",
        description: "Kích thước A6"
    },
    {
        id: 11,
        name: "Phụ kiện Congratulations",
        image: "congratulations.avif",
        price: "30,000 VNĐ",
        description: "Chất liệu mica dày 2mm"
    },
    {
        id: 12,
        name: "Phụ kiện Thiệp",
        image: "thiep1.avif",
        price: "12,000 VNĐ",
        description: "Kích thước A6"
    },
    {
        id: 13,
        name: "Phụ kiện Thiệp",
        image: "thiep2.avif",
        price: "12,000 VNĐ",
        description: "Kích thước A6"
    },
    {
        id: 14,
        name: "Phụ kiện Thiệp",
        image: "thiep3.avif",
        price: "12,000 VNĐ",
        description: "Kích thước A6"
    },
];

// Hàm hiển thị chi tiết sản phẩm khi nhấp vào
function viewProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    
    // Cập nhật thông tin chi tiết sản phẩm
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-price').textContent = "Giá: " + product.price;
    document.getElementById('product-description').textContent = product.description;
    
    // Hiển thị hộp chi tiết sản phẩm
    document.getElementById('product-detail').style.display = 'block';
}

// Số lượng sản phẩm trên mỗi trang
const productPerPage = 3;

// Lấy tất cả các sản phẩm
const product = document.querySelectorAll('.product-item');

// Tổng số trang cần phân trang
const totalPages = Math.ceil(product.length / productPerPage);

// Hàm để hiển thị các sản phẩm cho trang cụ thể
function showPage(page) {
  // Tính chỉ số bắt đầu và kết thúc của các sản phẩm
  const start = (page - 1) * productPerPage;
  const end = start + productPerPage;

  // Ẩn tất cả các sản phẩm
  product.forEach((product, index) => {
    product.style.display = 'none';
  });

  // Hiển thị các sản phẩm trong khoảng từ start đến end
  for (let i = start; i < end && i < product.length; i++) {
    product[i].style.display = 'block';
  }
}

// Tạo các nút phân trang
function createPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Xóa nội dung cũ

  // Tạo nút cho mỗi trang
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.onclick = () => showPage(i);
    pagination.appendChild(button);
  }
}

// Gọi hàm để hiển thị trang đầu tiên và tạo phân trang
showPage(1);
createPagination();

// Hàm đóng hộp chi tiết sản phẩm
function closeProductDetail() {
    document.getElementById('product-detail').style.display = 'none';
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateItemQuantity = (id, newQuantity) => {
    const item = cart.find(product => product.id === id);
    if (item && newQuantity > 0) {
        item.quantity = parseInt(newQuantity, 10);
        updateCart();
    }
};

// Mở modal giỏ hàng
const openCartModal = () => {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) cartModal.style.display = 'block';
};

// Đóng modal giỏ hàng
const closeCartModal = () => {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) cartModal.style.display = 'none';
};

// Lắng nghe sự kiện cho các sản phẩm khi nhấn nút "Thêm vào giỏ hàng"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item');
        const productId = parseInt(productItem.getAttribute('data-id'), 10);
        const productName = productItem.querySelector('h3')?.textContent || '';
        const productPrice = parseInt(productItem.querySelector('p')?.textContent.replace('Giá: ', '').replace(' VND', ''), 10);
        const productImage = productItem.querySelector('img')?.src || '';

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        };

        addToCart(product);
    });
});

// Hiển thị giỏ hàng khi nhấn vào icon giỏ hàng
const cartIcon = document.getElementById('cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', openCartModal);
}

// Lắng nghe sự kiện đóng modal khi nhấn ngoài vùng modal
window.addEventListener('click', (event) => {
    const cartModal = document.getElementById('cart-modal');
    if (event.target === cartModal) {
        closeCartModal();
    }
});

// Xóa tất cả sản phẩm trong giỏ hàng
const clearCart = () => {
    cart = []; // Xóa toàn bộ sản phẩm trong giỏ hàng
    updateCart(); // Cập nhật lại giao diện giỏ hàng
};

// Lắng nghe sự kiện để xóa giỏ hàng
const clearCartBtn = document.getElementById('clear-cart-btn');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
}

// Xử lý đăng nhập Admin
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminBtn = document.getElementById('admin-btn');
const adminLoginModal = document.getElementById('admin-login-modal');
const closeModal = document.getElementById('close-modal');
const adminLoginForm = document.getElementById('admin-login-form');

if (adminLoginBtn && adminLoginModal) {
    adminLoginBtn.addEventListener('click', () => {
        adminLoginModal.style.display = 'flex';
    });
}

if (closeModal && adminLoginModal) {
    closeModal.addEventListener('click', () => {
        adminLoginModal.style.display = 'none';
    });
}

if (adminLoginForm && adminBtn) {
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('admin-username')?.value.trim();
        const password = document.getElementById('admin-password')?.value.trim();

        if (username === 'admin123' && password === '123') {
            alert('Đăng nhập thành công!');
            adminLoginModal.style.display = 'none';
            adminLoginBtn.style.display = 'none';
            adminBtn.style.display = 'inline-block';
            showAdminFeatures();
        } else {
            alert('Tài khoản hoặc mật khẩu sai!');
        }
    });
}

// Hiển thị các tính năng Admin
const showAdminFeatures = () => {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        if (!item.querySelector('.edit-product')) {
            const editButton = document.createElement('button');
            editButton.textContent = 'Chỉnh sửa';
            editButton.classList.add('edit-product');
            editButton.onclick = () => editProduct(item);
            item.appendChild(editButton);
        }
    });
};
// chỉnh sửa sản phẩm
const editProduct = (productItem) => {
    const productName = productItem.querySelector('h3')?.textContent;
    const productPrice = productItem.querySelector('p')?.textContent.replace('Giá: ', '').replace(' VND', '').trim();

    const editNameInput = document.getElementById('edit-product-name');
    const editPriceInput = document.getElementById('edit-product-price');

    if (!editNameInput || !editPriceInput) return;

    editNameInput.value = productName;
    editPriceInput.value = productPrice;

    const editProductModal = document.getElementById('edit-product-modal');
    if (editProductModal) {
        editProductModal.style.display = 'flex';
    }

    const closeEditModal = document.getElementById('close-edit-modal');
    if (closeEditModal) {
        closeEditModal.addEventListener('click', () => {
            if (editProductModal) {
                editProductModal.style.display = 'none';
            }
        }, { once: true });
    }

    const editProductForm = document.getElementById('edit-product-form');
    if (editProductForm) {
        editProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (productItem.querySelector('h3')) {
                productItem.querySelector('h3').textContent = editNameInput.value;
            }
            if (productItem.querySelector('.item-price')) {
                productItem.querySelector('.item-price').textContent = `${editPriceInput.value} VND`;
            }
            if (editProductModal) {
                editProductModal.style.display = 'none';
            }
        }, { once: true });
    }
};
// Hàm mở modal chi tiết sản phẩm
const openProductDetailModal = (product) => {
    const modal = document.getElementById('product-detail-modal');
    const nameElement = document.getElementById('product-detail-name');
    const imageElement = document.getElementById('product-detail-image');
    const descriptionElement = document.getElementById('product-detail-description');
    const priceElement = document.getElementById('product-price-detail');

    // Cập nhật thông tin sản phẩm vào modal
    nameElement.textContent = product.name;
    imageElement.src = product.image;
    descriptionElement.textContent = product.description;
    priceElement.textContent = product.price;

    modal.style.display = 'block';
}

// Hàm đóng modal chi tiết sản phẩm
const closeProductDetailModal = () => {
    document.getElementById('product-detail-modal').style.display = 'none';
}

// Gán sự kiện cho các nút "Xem chi tiết"
const productButtons = document.querySelectorAll('.view-product-detail-btn');
productButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = {
            name: `Bánh Ngọt ${index + 1}`,
            image: `image${index + 1}.jpg`,
            description: `Mô tả sản phẩm ${index + 1}`,
            price: `${(index + 1) * 50000} VND`
        };
        openProductDetailModal(product);
    });
});

