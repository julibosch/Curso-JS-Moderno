document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver( entries => {
        console.log(entries[0])
    })  

    observer.observe(document.querySelector('.premium'))
})