// HttpClient class
        class HttpClient {
            constructor(baseURL = "") {
                this.baseURL = baseURL;
            }

            request(method, endpoint, data = null) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    const url = this.baseURL + endpoint;

                    xhr.open(method, url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            let response;
                            try {
                                response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                            } catch (e) {
                                response = xhr.responseText;
                            }

                            if (xhr.status >= 200 && xhr.status < 300) {
                                resolve(response);
                            } else {
                                reject({
                                    status: xhr.status,
                                    statusText: xhr.statusText,
                                    data: response
                                });
                            }
                        }
                    };

                    xhr.onerror = function () {
                        reject(new Error("Network error"));
                    };

                    xhr.send(data ? JSON.stringify(data) : null);
                });
            }

            get(endpoint) {
                return this.request("GET", endpoint);
            }

            post(endpoint, data) {
                return this.request("POST", endpoint, data);
            }

            put(endpoint, data) {
                return this.request("PUT", endpoint, data);
            }

            delete(endpoint) {
                return this.request("DELETE", endpoint);
            }
        }

        // Services
        const userService = new HttpClient("https://jsonplaceholder.typicode.com");
        const productService = new HttpClient("https://fakestoreapi.com");

        // Current state
        let currentService = null;
        let currentOperation = null;

        // DOM Elements
        const outputEl = document.getElementById('output');
        const userFormEl = document.getElementById('userForm');
        const productFormEl = document.getElementById('productForm');

        // Notification function
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Output functions
        function clearOutput() {
            outputEl.innerHTML = 'Output cleared';
            outputEl.className = 'output-content';
        }

        function showOutput(content, className = '') {
            outputEl.innerHTML = content;
            outputEl.className = 'output-content ' + className;
        }

        function showLoading() {
            showOutput('<div class="loading">Loading...</div>', 'loading');
        }

        // Format functions for displaying data
        function formatUserList(users) {
            if (!users || users.length === 0) {
                return '<div class="no-data">No users found</div>';
            }
            
            let html = `<div class="item-list">`;
            html += `<div style="margin-bottom: 15px; color: #666; font-weight: 600;">
                      📊 Found ${users.length} users
                    </div>`;
            
            users.forEach((user, index) => {
                html += `
                    <div class="item-summary" onclick="toggleDetails('user-${index}')">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>👤 ${user.name}</strong><br>
                                <small>${user.email}</small>
                            </div>
                            <div style="color: #666; font-size: 0.9rem;">
                                ID: ${user.id}
                            </div>
                        </div>
                        <div id="user-${index}" class="item-details">
                            <strong>Phone:</strong> ${user.phone || 'N/A'}<br>
                            <strong>Website:</strong> ${user.website || 'N/A'}<br>
                            <strong>Company:</strong> ${user.company?.name || 'N/A'}<br>
                            <strong>Address:</strong> ${user.address?.street || 'N/A'}, ${user.address?.city || 'N/A'}
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
            return html;
        }

        function formatProductList(products) {
            if (!products || products.length === 0) {
                return '<div class="no-data">No products found</div>';
            }
            
            let html = `<div class="item-list">`;
            html += `<div style="margin-bottom: 15px; color: #666; font-weight: 600;">
                      🛒 Found ${products.length} products
                    </div>`;
            
            products.forEach((product, index) => {
                html += `
                    <div class="item-summary" onclick="toggleDetails('product-${index}')">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="flex: 1;">
                                <strong>${product.title}</strong><br>
                                <small>Category: ${product.category}</small>
                            </div>
                            <div style="margin-left: 15px; text-align: right;">
                                <div style="font-weight: bold; color: #2E7D32;">$${product.price}</div>
                                <div style="color: #666; font-size: 0.9rem;">
                                    ID: ${product.id}
                                </div>
                            </div>
                        </div>
                        <div id="product-${index}" class="item-details">
                            <strong>Description:</strong> ${product.description || 'No description'}<br>
                            <strong>Rating:</strong> ⭐ ${product.rating?.rate || 'N/A'} (${product.rating?.count || 0} reviews)
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
            return html;
        }

        // Toggle details function
        function toggleDetails(id) {
            const element = document.getElementById(id);
            if (element) {
                element.classList.toggle('show');
                const parent = element.parentElement;
                parent.classList.toggle('expanded');
            }
        }

        // GET ALL functions (no form needed)
        async function getAllUsers() {
            showLoading();
            try {
                const users = await userService.get('/users');
                showOutput(formatUserList(users), 'success');
                showNotification(`✅ Successfully loaded ${users.length} users`, 'success');
            } catch (error) {
                showOutput(`Error: ${error.message || error.statusText}\n${JSON.stringify(error.data, null, 2)}`, 'error');
                showNotification('❌ Failed to load users', 'error');
            }
        }

        async function getAllProducts() {
            showLoading();
            try {
                const products = await productService.get('/products');
                showOutput(formatProductList(products), 'success');
                showNotification(`✅ Successfully loaded ${products.length} products`, 'success');
            } catch (error) {
                showOutput(`Error: ${error.message || error.statusText}\n${JSON.stringify(error.data, null, 2)}`, 'error');
                showNotification('❌ Failed to load products', 'error');
            }
        }

        // Form display functions
        function showUserForm(operation) {
            currentService = 'user';
            currentOperation = operation;
            
            const formTitle = document.getElementById('userFormTitle');
            const formContent = document.getElementById('userFormContent');
            
            formTitle.textContent = `${operation.toUpperCase()} User`;
            
            switch(operation) {
                case 'get':
                    formContent.innerHTML = `
                        <div class="form-group">
                            <label for="userId">User ID:</label>
                            <input type="number" id="userId" placeholder="Enter user ID (1-10)" required min="1" max="10">
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Get User</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('userForm')">Cancel</button>
                        </div>
                    `;
                    break;
                    
                case 'post':
                    formContent.innerHTML = `
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="userName">Name:</label>
                                <input type="text" id="userName" placeholder="Enter name" required>
                            </div>
                            <div class="form-group">
                                <label for="userEmail">Email:</label>
                                <input type="email" id="userEmail" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                                <label for="userPhone">Phone:</label>
                                <input type="text" id="userPhone" placeholder="Enter phone">
                            </div>
                            <div class="form-group">
                                <label for="userWebsite">Website:</label>
                                <input type="text" id="userWebsite" placeholder="Enter website">
                            </div>
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Create User</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('userForm')">Cancel</button>
                        </div>
                    `;
                    break;
                    
                case 'put':
                    formContent.innerHTML = `
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="userIdPut">User ID (1-10):</label>
                                <input type="number" id="userIdPut" placeholder="Enter user ID" required min="1" max="10">
                            </div>
                            <div class="form-group">
                                <label for="userNamePut">Name:</label>
                                <input type="text" id="userNamePut" placeholder="Enter name">
                            </div>
                            <div class="form-group">
                                <label for="userEmailPut">Email:</label>
                                <input type="email" id="userEmailPut" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="userPhonePut">Phone:</label>
                                <input type="text" id="userPhonePut" placeholder="Enter phone">
                            </div>
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Update User</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('userForm')">Cancel</button>
                        </div>
                    `;
                    break;
                    
                case 'delete':
                    formContent.innerHTML = `
                        <div class="form-group">
                            <label for="userIdDelete">User ID (1-10):</label>
                            <input type="number" id="userIdDelete" placeholder="Enter user ID" required min="1" max="10">
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Delete User</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('userForm')">Cancel</button>
                        </div>
                    `;
                    break;
            }
            
            hideForm('productForm');
            userFormEl.classList.add('active');
        }

        function showProductForm(operation) {
            currentService = 'product';
            currentOperation = operation;
            
            const formTitle = document.getElementById('productFormTitle');
            const formContent = document.getElementById('productFormContent');
            
            formTitle.textContent = `${operation.toUpperCase()} Product`;
            
            switch(operation) {
                case 'get':
                    formContent.innerHTML = `
                        <div class="form-group">
                            <label for="productId">Product ID:</label>
                            <input type="number" id="productId" placeholder="Enter product ID (1-20)" required min="1" max="20">
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Get Product</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('productForm')">Cancel</button>
                        </div>
                    `;
                    break;
                    
                case 'post':
                    formContent.innerHTML = `
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="productTitle">Title:</label>
                                <input type="text" id="productTitle" placeholder="Enter product title" required>
                            </div>
                            <div class="form-group">
                                <label for="productPrice">Price:</label>
                                <input type="number" step="0.01" id="productPrice" placeholder="Enter price" required>
                            </div>
                            <div class="form-group">
                                <label for="productCategory">Category:</label>
                                <input type="text" id="productCategory" placeholder="Enter category" required>
                            </div>
                            <div class="form-group">
                                <label for="productDescription">Description:</label>
                                <textarea id="productDescription" placeholder="Enter description"></textarea>
                            </div>
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Create Product</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('productForm')">Cancel</button>
                        </div>
                    `;
                    break;
                    
                case 'put':
                    formContent.innerHTML = `
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="productIdPut">Product ID (1-20):</label>
                                <input type="number" id="productIdPut" placeholder="Enter product ID" required min="1" max="20">
                            </div>
                            <div class="form-group">
                                <label for="productTitlePut">Title:</label>
                                <input type="text" id="productTitlePut" placeholder="Enter product title">
                            </div>
                            <div class="form-group">
                                <label for="productPricePut">Price:</label>
                                <input type="number" step="0.01" id="productPricePut" placeholder="Enter price">
                            </div>
                            <div class="form-group">
                                <label for="productCategoryPut">Category:</label>
                                <input type="text" id="productCategoryPut" placeholder="Enter category">
                            </div>
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Update Product</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('productForm')">Cancel</button>
                        </div>
                    `;
                    break;
                    
                case 'delete':
                    formContent.innerHTML = `
                        <div class="form-group">
                            <label for="productIdDelete">Product ID (1-20):</label>
                            <input type="number" id="productIdDelete" placeholder="Enter product ID" required min="1" max="20">
                        </div>
                        <div class="form-buttons">
                            <button type="submit" class="submit-btn">Delete Product</button>
                            <button type="button" class="cancel-btn" onclick="hideForm('productForm')">Cancel</button>
                        </div>
                    `;
                    break;
            }
            
            hideForm('userForm');
            productFormEl.classList.add('active');
        }

        function hideForm(formId) {
            document.getElementById(formId).classList.remove('active');
        }

        // Form submission handlers
        async function handleUserSubmit(event) {
            event.preventDefault();
            showLoading();
            
            try {
                let result;
                
                switch(currentOperation) {
                    case 'get':
                        const userId = document.getElementById('userId').value;
                        result = await userService.get(`/users/${userId}`);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                        
                    case 'post':
                        const newUser = {
                            name: document.getElementById('userName').value,
                            email: document.getElementById('userEmail').value,
                            phone: document.getElementById('userPhone').value || 'N/A',
                            website: document.getElementById('userWebsite').value || 'N/A'
                        };
                        result = await userService.post('/users', newUser);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                        
                    case 'put':
                        const updateUserId = document.getElementById('userIdPut').value;
                        const updatedUser = {
                            name: document.getElementById('userNamePut').value,
                            email: document.getElementById('userEmailPut').value,
                            phone: document.getElementById('userPhonePut').value || 'N/A'
                        };
                        result = await userService.put(`/users/${updateUserId}`, updatedUser);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                        
                    case 'delete':
                        const deleteUserId = document.getElementById('userIdDelete').value;
                        result = await userService.delete(`/users/${deleteUserId}`);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                }
                
                showNotification(`${currentOperation.toUpperCase()} operation successful!`, 'success');
                hideForm('userForm');
                
            } catch (error) {
                showOutput(`Error: ${error.message || error.statusText}\n${JSON.stringify(error.data, null, 2)}`, 'error');
                showNotification('Operation failed!', 'error');
            }
        }

        async function handleProductSubmit(event) {
            event.preventDefault();
            showLoading();
            
            try {
                let result;
                
                switch(currentOperation) {
                    case 'get':
                        const productId = document.getElementById('productId').value;
                        result = await productService.get(`/products/${productId}`);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                        
                    case 'post':
                        const newProduct = {
                            title: document.getElementById('productTitle').value,
                            price: parseFloat(document.getElementById('productPrice').value),
                            category: document.getElementById('productCategory').value,
                            description: document.getElementById('productDescription').value || 'No description'
                        };
                        result = await productService.post('/products', newProduct);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                        
                    case 'put':
                        const updateProductId = document.getElementById('productIdPut').value;
                        const updatedProduct = {
                            title: document.getElementById('productTitlePut').value,
                            price: parseFloat(document.getElementById('productPricePut').value),
                            category: document.getElementById('productCategoryPut').value
                        };
                        result = await productService.put(`/products/${updateProductId}`, updatedProduct);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                        
                    case 'delete':
                        const deleteProductId = document.getElementById('productIdDelete').value;
                        result = await productService.delete(`/products/${deleteProductId}`);
                        showOutput(JSON.stringify(result, null, 2), 'success');
                        break;
                }
                
                showNotification(`${currentOperation.toUpperCase()} operation successful!`, 'success');
                hideForm('productForm');
                
            } catch (error) {
                showOutput(`Error: ${error.message || error.statusText}\n${JSON.stringify(error.data, null, 2)}`, 'error');
                showNotification('Operation failed!', 'error');
            }
        }

        // Initialize
        console.log('REST API Testing Tool initialized');
        
        // Add some sample data on load
        window.addEventListener('load', () => {
            showOutput('🚀 REST API Testing Tool Ready!\n\n📌 Features:\n• GET All - No form needed\n• GET by ID - Enter ID\n• POST - Create new item\n• PUT - Update existing item\n• DELETE - Remove item\n\nClick any button to start testing!');
        });