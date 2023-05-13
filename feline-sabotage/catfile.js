let images = Array.from(document.getElementsByTagName("img"));
let allheaders = Array.from(document.getElementsByTagName("h2"));
let anchorTags = Array.from(document.getElementsByTagName("a"))

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

for (let header of allheaders) {
    header.textContent = 'you have been catjacked'
}

for (let link of anchorTags) {
     link.href = 'https://www.youtube.com/watch?v=QH2-TGUlwu4'
}