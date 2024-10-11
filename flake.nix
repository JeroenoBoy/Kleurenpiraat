{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }: utils.lib.eachDefaultSystem (system: 
    let
      pkgs = (import nixpkgs) { inherit system; };
    in {
      devShell = pkgs.mkShell {
        name = "Kleurenpiraat shell";
        buildInputs = with pkgs; [
          nodejs_22
          android-tools
        ];

        shellHook = ''
          npm install
          echo ""
          echo "Node : `node --version`"
          echo "Npm : `npm --version`"
          echo "
          Welcome to the Kleurenpiraat shell 🚀!
          ";
        '';
      };

      packages = rec {
        default = kleuren-piraat;
        kleuren-piraat = pkgs.buildNpmPackage {
          buildInputs =  with pkgs; [ nodejs_22 ];
          name = "Kleurenpiraat";
          src = ./.;


          npmDepsHash = "sha256-FirF21hxg/NkkaRZQEcomXEpScuJRGyq7bTSULS9YHE=";
          npmBuild = "npm ci";

          installPhase = ''
            runHook preInstall

            echo "Copying files"
            mkdir -p $out/bin
            cp -r src $out/bin/
            cp -r node_modules $out/bin/
            cp package.json $out/bin/

            echo "#!${pkgs.nodejs_22}/bin/node
            require('./src');
            " &> $out/bin/Kleurenpiraat

            cd $out/bin

            echo "Changing permissions"
            chmod +x $out/bin/Kleurenpiraat

            runHook postInstall
          '';
        };
      };
    }
  );
}
