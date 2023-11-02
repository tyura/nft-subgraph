# nft-subgraph

This is a sample subgraph for indexing on-chain metadata of NFTs.

## Usage
Update the contract address in both the subgraph.yaml and networks.json files with your contract address.

Generates a set of helper functions from the graphql schema of a project.
```zsh
graph codegen
```

Build the subgraph.
```zsh
graph build
```

Store the access token on your computer.
```zsh
graph auth --studio <DEPLOY_KEY>
```

Deploy the subgraph.
```zsh
graph deploy --studio <SUBGRAPH_SLUG>
```