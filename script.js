window.addEventListener('DOMContentLoaded', () => {
    createMerchant()
    createMenu()
})

async function getData() {
    const res = await fetch('data.json');
    const data = await res.json();
    return data;
}

async function createMerchant() {
    const data = await getData();
    const { merchant } = data;
    const {
        name,
        logo,
        telephone,
        website,
        address,
        googleMap,
        hours,
        payment
    } = merchant;

    const j = hours.map(i => {
        const { day, hours } = i;
        return `
        <tr>
            <td>${day}</td>
            <td>${hours}</td>
        </tr>
        `
    }).join('');

    const k = payment.map(i => {
        const { name, image } = i;
        return `
        <figure>
            <img src="images/${image}" alt="${name}" loading="lazy"/>
        </figure>
        `
    }).join('');

    const img = document.createElement('img');
    img.setAttribute('src', `images/${logo}`);
    img.setAttribute('alt', `${name}`);
    img.setAttribute('loading', 'lazy');
    img.classList.add('logo');

    const h2 = document.createElement('h2');
    h2.innerText = telephone;

    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    anchor.innerText = website;

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    tbody.innerHTML = `${j}`;

    const h3 = document.createElement('h3');
    h3.innerText = address;

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `${googleMap}`);
    iframe.setAttribute('loading', 'lazy');

    const div = document.createElement('div');
    div.classList.add('grid');
    div.innerHTML = `${k}`;

    const section = document.createElement('section');
    section.appendChild(img);
    section.appendChild(h2);
    section.appendChild(anchor);
    section.appendChild(table);
    section.appendChild(h3);
    section.appendChild(iframe);
    section.appendChild(div);

    const app = document.getElementById('app');
    app.appendChild(section);
}

async function createMenu() {
    const data = await getData();
    const { menu } = data;
    const { categories } = menu;

    categories.map(category => {
        const {
            title,
            description,
            items
        } = category;

        const section = document.createElement('section');

        const h2 = document.createElement('h2');
        h2.innerText = title;
        section.appendChild(h2);

        if (description != null) {
            const p = document.createElement('p');
            p.innerText = description;
            section.appendChild(p);
        }

        const ul = document.createElement('ul');
        section.appendChild(ul);

        items.map(i => {
            const {
                id,
                item,
                description,
                price,
                subItems
            } = i;

            const li = document.createElement('li');
            ul.appendChild(li);

            const h3 = document.createElement('h3');
            h3.innerText = id ? id + ' • ' + item : item;
            li.appendChild(h3);

            if (description != null) {
                const p = document.createElement('p');
                p.innerText = description;
                li.appendChild(p);
            }

            if (price) {
                const h5 = document.createElement('h5');
                h5.innerText = price;
                li.appendChild(h5);
            }

            if (subItems) {
                const subUl = document.createElement('ul');
                li.appendChild(subUl);

                subItems.map(i => {
                    const {
                        id,
                        subItem,
                        description,
                        price
                    } = i;

                    const subLi = document.createElement('li');
                    subUl.appendChild(subLi);

                    const h4 = document.createElement('h4');
                    h4.innerText = id ? id + ' • ' + subItem : subItem
                    subLi.appendChild(h4);

                    if (description != null) {
                        const p = document.createElement('p');
                        p.innerText = description;
                        subLi.appendChild(p);
                    }

                    if (price) {
                        const h5 = document.createElement('h5');
                        h5.innerText = price;
                        subLi.appendChild(h5);
                    }

                }).join('')
            }
        })

        const app = document.getElementById('app');
        app.appendChild(section);

    }).join('');
}