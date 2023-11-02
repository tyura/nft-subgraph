import {
  Contract,
  Transfer as TransferEvent,
  MetadataUpdate as MetadataUpdateEvent,
} from "../generated/Contract/Contract";
import { Transfer, NFT } from "../generated/schema";
import { json, BigInt } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let instance = Contract.bind(event.address);
  let uri = instance.try_tokenURI(event.params.tokenId);
  const nft = new NFT(entity.tokenId.toString());
  if (!uri.reverted) {
    const res = json.try_fromString(uri.value);
    nft.tokenID = event.params.tokenId;
    if (res.isOk) {
      const obj = res.value.toObject();
      nft.packId = obj.mustGet("packId").toString();
      nft.isUsed = obj.mustGet("isUsed").toString() === "true";
      nft.firstUsedUser = obj.mustGet("firstUsedUser").toString();
      nft.useCount = BigInt.fromString(obj.mustGet("useCount").toString()).toI32();
      nft.image = obj.mustGet("image").toString();
    }
  }
  nft.save();
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  const _tokenId = event.params._tokenId
  let instance = Contract.bind(event.address);
  let uri = instance.try_tokenURI(_tokenId);
  const nft = new NFT(_tokenId.toString());
  if (!uri.reverted) {
    const res = json.try_fromString(uri.value);
    nft.tokenID = _tokenId;
    if (res.isOk) {
      const obj = res.value.toObject();
      nft.packId = obj.mustGet("packId").toString();
      nft.isUsed = obj.mustGet("isUsed").toString() === "true";
      nft.firstUsedUser = obj.mustGet("firstUsedUser").toString();
      nft.useCount = BigInt.fromString(obj.mustGet("useCount").toString()).toI32();
      nft.image = obj.mustGet("image").toString();
    }
  }
  nft.save();
}
