const posters = [
    `Концертный зал, 2 этаж, стенд 10. С 15 Августа по 2 Сентября 2022 года`,  

    'СJF, ЦВК "Экспоцетнр", павильон №7, зал 3, стенд №73С15 с 27 Сентября по 30 Сентября',

    'Екатеринбруг ShoesStar Детский сектор, стенд 53 с 4 Сентября по 6 Сентября'
]
let posterFlag = 0;
const elements = {
    arrows: document.querySelectorAll('[data-arrow]'),
    arrowLeft: document.querySelector('[data-arrow="left"]'),
    arrowRight: document.querySelector('[data-arrow="right"]'),
    poster: document.querySelector('[data-poster]'),
    card: document.querySelectorAll('.card')
}
elements.poster.innerHTML = posters[posterFlag];
console.log('start --> ', posterFlag)

// Смена даты выставки
const changeInfo = (arrow) => {
    arrow = arrow || 2
    if (arrow === 'left') {
        setTimeout(() => {
            elements.poster.style.opacity = '0'
        }, 0)
        posterFlag = posterFlag - 1;
        if (posterFlag === -1) {
            posterFlag = posters.length - 1;
            elements.poster.innerHTML = posters[posterFlag];
        } else {
            elements.poster.innerHTML = posters[posterFlag]
        }
        setTimeout(() => {
            elements.poster.style.opacity = '1'
        }, 250)
    }
    else if (arrow === 'right') {
        posterFlag = posterFlag + 1;
        if (posterFlag > posters.length - 1) {
            posterFlag = 0;
            elements.poster.innerHTML = posters[posterFlag]
        } else {
            elements.poster.innerHTML = posters[posterFlag]
        }
    }
    else {
        posterFlag = posterFlag - 1;
        setTimeout(() => {
            elements.poster.style.opacity = '0'
        }, 0)
        if (posterFlag === -1) {
            posterFlag = posters.length - 1;
        } else if (posterFlag > posters.length - 1) {
            posterFlag = 0;
        }
        elements.poster.innerHTML = posters[posterFlag];
        setTimeout(() => {
            elements.poster.style.opacity = '1'
        }, 250)
    }
    
}
// Автоматическая смена даты выставки
const autoChange = () => {
    setTimeout(() => {
        changeInfo();
        autoChange(posterFlag);
    }, 4000)
}
autoChange()

// События стрелок вперед/назад
elements.arrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
        elements.poster.style.opacity = 0;
        changeInfo(arrow.dataset.arrow);
        setTimeout(() => {
            elements.poster.style.opacity = 1;
        }, 200)
    })
})

// События фото-карточек
elements.card.forEach((event) => {
    event.addEventListener('touchEvent', (card) => {
        card.stopPropagation()
        console.log(event);
        event.classList.toggle('cardToggle')
    });

    event.addEventListener('mouseover', (card) => {
        card.stopPropagation()
        console.log(event);
        event.classList.add('cardToggle')
    });

    event.addEventListener('mouseout', (card) => {
        card.stopPropagation()
        console.log(event);
        event.classList.remove('cardToggle')
    })
})
