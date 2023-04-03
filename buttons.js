document
  .getElementById("character-creator")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    console.log(data);

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "character.json";
    link.click();
    link.remove();
  });

document
  .getElementById("import-character")
  .addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        const data = JSON.parse(this.result);

        for (const key in data) {
          const element = document.querySelector(`[name="${key}"]`);

          if (!element) {
            return;
          }

          element.value = data[key];
          element.dispatchEvent(new Event("change"));
        }
      });

      reader.readAsText(file);
    });

    fileInput.click();
  });