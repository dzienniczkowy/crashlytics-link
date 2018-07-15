function getLastVersionTag() {
    return document.querySelectorAll(".build-version-table tbody tr td:nth-child(1) a")[0].textContent.split(" ")[0];
}

function getArrayOfTraceItems() {
    return document.querySelectorAll("tr.stack-frame.developer-code td.frame-code div div");
}

function getPathFromPackage(name) {
    const arr = name.split(".");
    arr.splice(-2, 2);
    return arr.join("/");
}

function getFilename(basename) {
    return basename.slice(1, -1).split(":").join("#L")
}

function addLinksToTraceItems() {
    const lines = getArrayOfTraceItems();

    Array.from(lines).forEach(item => {
        const packageName = item.querySelector("span:first-child").textContent;
        const basename = item.querySelector(".basename").textContent;

        if (!packageName.includes("io.github.wulkanowy")) {
            return;
        }

        const span = document.createElement("span");
        const a = document.createElement("a");
        a.setAttribute("href", "https://github.com/wulkanowy/wulkanowy/blob/"
                + getLastVersionTag()
                + (packageName.includes("io.github.wulkanowy.api") ? '/api' : "/app") + "/src/main/java/"
                + getPathFromPackage(packageName) + "/"
                + getFilename(basename));
        a.textContent = " Open →";
        a.setAttribute("target", "_blank");
        span.appendChild(a);
        item.appendChild(span);
    });

}

const obs = new MutationObserver(function (mutations, observer) {
    console.log("Mutation start");
    if (document.querySelector(".stack-frame.developer-code") && !document.querySelector(".stacktrace").classList.contains("cl-loaded")) {
        console.log("Mutation");
        addLinksToTraceItems();
        document.querySelector(".stacktrace").classList.add("cl-loaded");
    }
});
obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });
