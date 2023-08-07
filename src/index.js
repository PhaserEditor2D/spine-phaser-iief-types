const fs = require("fs");
const path = require("path");

const basePath = path.join(process.env.SPINE_RUNTIMES, "spine-ts");

fs.rmSync("dist", { force: true, recursive: true });
fs.mkdirSync("dist");
fs.cpSync("manual", "dist", { force: true, recursive: true });
//fs.cpSync(path.join(basePath, "spine-phaser", "dist", "mixins.d.ts"), path.join("dist", "phaser-mixins.d.ts"));

for (const dir of ["spine-core", "spine-webgl", "spine-phaser"]) {

    const str = buildDir(path.join(dir, "dist"));

    const file = path.join("dist", `${dir}.d.ts`);
    
    fs.writeFileSync(file, str);
}

function buildDir(dir) {

    console.log(`Processing ${dir}`);

    const fullDir = path.join(basePath, dir);

    let str = "";

    const files = fs.readdirSync(fullDir);

    for (const file of files) {

        const fullFile = path.join(fullDir, file);

        if (file === "require-shim.d.ts"
            || file === "index.d.ts"
            /*|| file === "mixins.d.ts"*/) {

            continue;
        }

        if (file.endsWith(".d.ts")) {

            console.log(`  Include ${dir}/${file}`);

            let fileOutStr = "";

            const fileStr = fs.readFileSync(fullFile).toString();

            for (let line of fileStr.split("\n")) {

                if (line.startsWith("import ")
                    || line.startsWith("export * from ")) {

                    continue;
                }

                for (const trim of ["export ", "declare "]) {

                    if (line.startsWith(trim)) {

                        line = line.substring(trim.length);
                    }
                }

                if (line.trim() === "{};") {

                    continue;
                }

                line = line.replaceAll("import(\"./mixins\").", "");

                fileOutStr += `\t${line}\n`;
            }

            if (file === "index.d.ts") {

                str += `\n\n// PACK: ${dir}/${file}\n\n${fileOutStr}\n`;

            } else {

                str += `\n\n// PACK: ${dir}/${file}\ndeclare namespace spine {\n${fileOutStr}\n}`;
            }

        } else if (fs.statSync(fullFile).isDirectory()) {

            str += buildDir(path.join(dir, file));
        }
    }

    return str;
}