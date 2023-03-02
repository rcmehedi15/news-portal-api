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
      const newsContainer = document.getElementById('all-news');
      newsContainer.innerHTML = ""
    data.data.forEach((singleNews) => {

      // destructuring , main array er vitor child proparty added
      const {image_url,title,author,details,total_view} =singleNews;
       const card = document.createElement('div'); // div create 
       card.classList.add('card','mb-3'); // class create
        // tempelte string using   child div create
       card.innerHTML = `
       <div class="row g-0">
       <div class="col-md-4">
         <img src="${image_url}" class="img-fluid rounded-start" alt="...">
       </div>
       <div class="col-md-8 d-flex flex-column">
         <div class="card-body">
           <h5 class="card-title">${title}</h5>
           <p class="card-text">${details.slice(0,200)}...</p>
           </div>
           <div class="card-footer border-0 bg-body d-flex justify-content-between" alig>
            <div class="d-flex gap-2">
                  <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">       
                  <div>
                    <p class="m-0 p-0">${author.name}</p>
                    <p class= "m-0 p-0">${author.published_date}</p>
                 </div>
            </div>
           <div class="d-flex align-items-center">
            <i class="fas fa-eye"> </i>
            <p class= "m-0 p-0">${total_view}</p>      
           </div>
           <div>
              <i class="fas fa-star"> </i>
            
           </div>
           <div>
              <i class="fas fa-arrow-right"> </i>
              
           </div>
           </div>
       </div>
     </div>
       `;
       newsContainer.appendChild(card);
       
    })
};
