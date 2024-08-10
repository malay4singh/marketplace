getData();

async function getData(){
    res=await axios.get('https://dummyjson.com/products');
    data=res.data.products;

    data.forEach(item => {
        if(item.category==="beauty"){
            container=$('#beauty .cards_container');
        }
        else if(item.category==="fragrances"){
            container=$('#fragrances .cards_container');
        }
        else if(item.category==="furniture"){
            container=$('#furniture .cards_container');
        }
        else if(item.category==="groceries"){
            container=$('#groceries .cards_container');
        }

        createCard(item, container);
    });
}

products=$('.products_container');

products.on('click', (e)=>{
    if($(e.target).hasClass('products_heading')){
        $(e.target).next().slideToggle(600);
        $(e.target).next().css('display', 'flex');
        $(e.target).next().css('flex-wrap', 'wrap');
        $(e.target).next().css('justify-content', 'center');
    }

    if($(e.target).hasClass('product_category') || $(e.target).hasClass('arrow')){
        $(e.target).parent().next().slideToggle(600);
        $(e.target).parent().next().css('display', 'flex');
        $(e.target).parent().next().css('flex-wrap', 'wrap');
        $(e.target).parent().next().css('justify-content', 'center');
    }

    if($(e.target).hasClass('more')){
        console.log($(e.target).next());
        $(e.target).next().slideToggle();
    }

    if($(e.target).hasClass('buy')){
        addToCart();
    }
})

function createCard(item, container){
    image=item.thumbnail;
    brand=item.brand;
    title=item.title;
    rating=item.rating;
    price=item.price;
    desc=item.description;
    stock=item.stock;

    let newCard=$(`<div class="card">
    <div class="image"></div>
    <div class="about">
        <div class="title">
            <span>${brand}</span><br>
            ${title}
        </div>
        <div class="rating">
            <br>${rating}
        </div>
    </div>
    <div class="purchase">
        <div class="price">
            $${price}
        </div>
        <div class="buy">
            Buy
        </div>
    </div>
    <span class="more">more...</span>
    <div class="description">
        ${desc}<br><br>

        <span>Stock: ${stock}</span> 
    </div>
</div>`);

    newCard.find('.image').css('background-image', `url(${image})`);

    container.append(newCard);
}