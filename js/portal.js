const fetchCategories = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.data));
}
const showCategories = data => {
    // capture categories container to append all the category links
    const categoriesContainer = document.getElementById('categories-container');
    data.news_category.forEach(singleCategory =>{
        categoriesContainer.innerHTML += `<a class="nav-link" href="#" onclick="fetchCategoriesNews('${singleCategory.category_id}','${singleCategory.category_name}')" >${singleCategory.category_name}</a>`
    
        // let linkContainer = document.createElement('p'); --- 2nd styles
        // linkContainer.innerHTML = `<a class="nav-link" href="#">${singleCategory.category_name}</a>`
        // categoriesContainer.appendChild(linkContainer)
    })
}

// -----------  fetch all news available in a category (2)

const fetchCategoriesNews = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showAllNews(data,category_name))
} 

const showAllNews = (data, category_name) => {
    console.log(data, category_name);
    document.getElementById('news-count').innerText = data.data.length;
    document.getElementById('category-name').innerText = category_name;
}