{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs =
    {
      self,
      nixpkgs,
      devenv,
      systems,
      ...
    }@inputs:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      packages = forEachSystem (system: {
        devenv-up = self.devShells.${system}.default.config.procfileScript;
      });

      devShells = forEachSystem (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          setupScript = pkgs.writeShellScriptBin "setup-env" "\n";
        in
        {
          default = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [
              {
                name = "dqualizer development shell";
                dotenv.disableHint = true;

                languages = with pkgs; {
                  javascript = {
                    enable = true;
                    package = nodePackages_latest.nodejs;
                    corepack.enable = false;
                    npm.enable = true;
                    pnpm.enable = true;
                  };

                  typescript.enable = true;
                };

                packages =
                  with pkgs;
                  [
                    nushell
                    biome
                    nil
                    nixfmt-rfc-style
                  ]
                  ++ lib.optionals stdenv.isDarwin (
                    with darwin.apple_sdk.frameworks;
                    [
                      Cocoa
                      CoreFoundation
                      CoreServices
                      Security
                    ]
                  );

                enterShell = "${setupScript}/bin/setup-env";
              }
            ];
          };
        }
      );
    };
}
