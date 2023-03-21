window.addEventListener('DOMContentLoaded', () => {
    createApp();
})

async function getData() {
    const res = await fetch('data.json');
    const data = await res.json();
    return data;
}

async function createHeader(data) {
    const { merchant } = data;
    const { name, logo, contact, aboutRestaurant } = merchant;
    const { telephone, email, website } = contact;
    const { paragraph1, paragraph2 } = aboutRestaurant;

    const app = document.getElementById('app');
    const header = document.createElement('header');

    header.innerHTML = `
    <img src="images/${logo}" alt="${name}">
    <h1>${telephone}</h1>
    <div class="flex">
        <a href="#">${website}</a>
        <span>|</span>
        <a href="#">${email}</a>
    </div>
    <div class="wrapper">
        <p>${paragraph1}</p>
        <p>${paragraph2}</p>
    </div>
    `;

    app.appendChild(header);
}

async function createMenu(data) {
    const { menu } = data;
    const { categories } = menu;

    categories.map(i => {
        const { title, description, items } = i;
        const app = document.getElementById('app');
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        h2.innerText = `${title}`;
        section.appendChild(h2);

        if (description != null) {
            const p = document.createElement('p');
            p.innerText = `${description}`;
            section.appendChild(p);
        }

        const ul = document.createElement('ul');
        section.appendChild(ul);

        items.map(i => {
            const { id, item, description, price, subItems } = i;
            const li = document.createElement('li');
            ul.appendChild(li);

            const h3 = document.createElement('h3');
            h3.innerText = id ? `${id} • ${item}`: `${item}`;
            li.appendChild(h3);

            if (description != null) {
                const p = document.createElement('p');
                p.innerText = `${description}`;
                li.appendChild(p);
            }

            if (price) {
                const h4 = document.createElement('h4');
                h4.innerText = `${price}`;
                li.appendChild(h4);
            }

            if (subItems) {
                const ul = document.createElement('ul');
                li.appendChild(ul);

                subItems.map(i => {
                    const { id, subItem, description, price } = i;
                    const li = document.createElement('li');
                    ul.appendChild(li);

                    const h3 = document.createElement('h3');
                    h3.innerText = id ? `${id} • ${subItem}` : `${subItem}`;
                    li.appendChild(h3);

                    if (description != null) {
                        const p = document.createElement('p');
                        p.innerText = `${description}`;
                        li.appendChild(p);
                    }

                    if (price) {
                        const h4 = document.createElement('h4');
                        h4.innerText = `${price}`;
                        li.appendChild(h4);
                    }
                }).join('')
            }
        }).join('');
        app.appendChild(section);
    })
}

async function createReviews(data) {
    const { merchant } = data;
    const { customerReviews } = merchant;

    const app = document.getElementById('app');
    const section = document.createElement('section');

    section.innerHTML = customerReviews.map(i => {
        const { review, source } = i;
        return `
        <div class="wrapper">
            <p>${review}</p>
            <h5>- ${source}</h5>
        </div>
        `
    }).join('');

    app.appendChild(section);
}

async function createAbout(data) {
    const { merchant } = data;
    const { location, businessHours, payment } = merchant;
    const { address, city, state, zipCode, googleMaps } = location;

    const k = businessHours.map(i => {
        const { day, hours } = i;
        return `
        <tr>
            <td>${day}</td>
            <td>${hours}</td>
        </tr>
        `
    }).join('');

    const m = payment.map(i => {
        const { item, image } = i;
        return `
        <figure>
            <img src="images/${image}" alt="${item}" loading="lazy"/>
        </figure>
        `
    }).join('')

    const app = document.getElementById('app');
    const section = document.createElement('section');

    section.innerHTML = `
    <div class="wrapper">
        <h2>${address} ${city}, ${state} ${zipCode}</h2>
        <iframe src="${googleMaps}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen title="Google Maps"></iframe>
    </div>
    <table>
        <tbody>${k}</tbody>
    </table>
    <div class="grid">${m}</div>
    `;

    app.appendChild(section);
}

async function createApp() {
    const data = await getData();
    createHeader(data);
    createMenu(data);
    createReviews(data);
    createAbout(data);
}