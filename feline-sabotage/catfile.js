let images = Array.from(document.getElementsByTagName("img"));
let allheaders = Array.from(document.getElementsByTagName("h2"));

Promise.all(
  images.map((image) =>
    fetch("https://cataas.com/cat/gif")
      .then((res) => res.blob())
      .then((imageBlob) => {
        const catImage = URL.createObjectURL(imageBlob);
        image.src = catImage;
      })
      .catch((error) => console.log(error))
  )
);

for (let link of allheaders) {
    link.textContent = 'you have been catjacked'
}