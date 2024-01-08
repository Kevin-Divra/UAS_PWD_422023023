const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');
const carousel = document.querySelector('.carousel');
const wrapper = document.querySelector('.wrapper')
const arrowBtns = document.querySelectorAll('.wrapper i');
const firstCardWidth = carousel.querySelector('.card').offsetWidth;
const carouselChildrens = [...carousel.children];
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const form = document.getElementById('form');



form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ada yang salah!",
      });

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    Swal.fire({
        title: "Pesan Berhasil di Kirim",
        text: "Terimakasih Telah Menghubungi Kami",
        icon: "success"
      });

    errorDisplay.innerText = ''; 
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const firstnameValue = firstname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    if(firstnameValue === '') {
        setError(firstname, 'firstname is required');
    } else {
        setSuccess(firstname, 'Name is Valid');
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email, 'Email is Valid');
    }

    if(phoneValue === '') {
        setError(phone, 'Phone is required');
    } else if (phoneValue.length < 12 ) {
        setError(phone, 'Phone must be at least 12 character.')
    } else {
        setSuccess(phone, 'Phone Number is Valid');
    }
}




let isDragging = false, startX, startScrollLeft, timeoutId;

// get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    // recods the initial cursor and scroll of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isdragging is false return from here
    // update the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; //return if window is smaller than 800
    // autoplay the carousel adter every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay ();



const infiniteScroll = () => {
    // if the corousel is at the biginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth = ( 2 * carousel.offsetWidth);
        carousel.classList.remove('no-transition');
    }
    // if the corousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(':hover')) autoPlay();
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
// carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId))
wrapper.addEventListener('mouseleave', autoPlay);

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

menu_items.forEach(item => {
    item.addEventListener('click',function(){
        close();
    })
})

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-100%';
}


const btn = document.getElementById('button');



btn.addEventListener('click',function() {
    Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Anda Tidak Dapat Mengubah Pesanan Ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Pesan sekarang!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Pesanan Diterima",
            text: "Silahakan tunggu pemberitahuan selanjutnya.",
            icon: "success"
          });
        }
      });
})


