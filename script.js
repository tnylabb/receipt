// localstoragebol feltoltes
let products = JSON.parse(localStorage.getItem('products')) || [];

function addItem() {
    const name = document.getElementById('name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseInt(document.getElementById('price').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value);


    // ne lehessen NaN\null az input
    if (!name || isNaN(quantity) || isNaN(price) || !taxRate) {
        form.classList.add('form-error');
        setTimeout(() => form.classList.remove('form-error'), 300);
        return;
    }

    const product = { name, quantity, price, taxRate };
    products.push(product);
    updateReceipt();
    saveToLocalStorage();
    clearForm();
}


// inputok visszaállítása
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = 1;
    document.getElementById('price').value = '';
    document.getElementById('taxRate').selectedIndex = 0; 
}

// új tétel, számitások
function updateReceipt() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    let subtotal = 0;
    let totalTax = 0;

    products.forEach((product, index) => {
        const productTotal = product.quantity * product.price;
        const productTax = productTotal * product.taxRate;
        subtotal += productTotal;
        totalTax += productTax;

        productList.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td class="centered">${product.quantity} db * ${product.price} Ft</td>
                <td class="amount">${productTotal} Ft</td>
                <td>${(product.taxRate * 100).toFixed(2)}%</td>
                <td><button id="delete-item" onclick="removeItem(${index})">Törlés</button></td>
            </tr>
        `;
    });


    const total = subtotal + totalTax;

    document.getElementById('subtotal').innerText = `${subtotal} Ft`;
    document.getElementById('tax').innerText = `${totalTax.toFixed(0)} Ft`;
    document.getElementById('total').innerText = `${total.toFixed(0)} Ft`;
}

function removeItem(index) {
    products.splice(index, 1);
    updateReceipt();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

// oldal betoltesekor frissites
updateReceipt();