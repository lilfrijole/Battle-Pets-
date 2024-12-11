// The 'nft_battle' program.
program nft_battle_4215.aleo {
    // Random record for minter to consume for NFT
    record RandomIndex {
        owner: address,
        index: u128
    }

    // NFT record
    record NFT {
        owner: address,
        strength: u8,
        speed: u8,
        stamina: u8
    }

    // NFT in match for facilitator to help settling
    record MatchNFT {
        owner: address,
        match_id: u128,
        original_owner: address,
        strength: u8,
        speed: u8,
        stamina: u8
    }

    // Randomness to generate new NFT
    struct Random {
        rand1: u128,
        rand2: u128,
        rand3: u128
    }

    // Match data for each game
    struct MatchData {
        game_finished: bool,
        player1: address,
        player2: address,
        attr_to_battle: u8,
        winner: address
    }

    // Incremental index to acquire randomness
    // 0u128 as global key
    mapping random_index: u128 => u128;
    mapping randomness: u128 => Random;

    // Incremental match id
    // 0u128 as global key
    mapping current_match_id: u128 => u128;
    // Match Id to match data
    mapping match_data: u128 => MatchData;

    // Get random number for minter to consume for NFT later
    async transition get_random_number(index: u128) -> (RandomIndex, Future) {
        return (RandomIndex {
            owner: self.caller, 
            index: index,
        }, get_random_number_f(index));
    }

    async function get_random_number_f(index: u128) {
        let current_index: u128 = random_index.get_or_use(0u128, 0u128);
        assert_eq(index, current_index);

        let random: Random = Random {
            rand1: ChaCha::rand_u128(),
            rand2: ChaCha::rand_u128(),
            rand3: ChaCha::rand_u128()
        };

        randomness.set(current_index, random);

        random_index.set(0u128, current_index + 1u128);
    }

    // Mint NFT with randomness
    async transition mint_nft(
        ri: RandomIndex,
        rand1: u128,
        rand2: u128,
        rand3: u128
    ) -> (NFT, Future) {
        // 0 - 10 as attribute value
        return (NFT {
            owner: self.caller,
            strength: rand1.mod(11u128) as u8,
            speed: rand2.mod(11u128) as u8,
            stamina: rand3.mod(11u128) as u8
        }, mint_nft_f(ri.index, rand1, rand2, rand3));
    }

    async function mint_nft_f(index: u128, rand1: u128, rand2: u128, rand3: u128) {
        let random: Random = randomness.get(index);
        assert_eq(random.rand1, rand1);
        assert_eq(random.rand2, rand2);
        assert_eq(random.rand3, rand3);
    }

    // Simple match-making where if a game is pending, it must be finished with other player before proceeding to next game
    // Requires facilitator to help settling game privately
    async transition find_battle(
        nft: NFT,
        facilitator: address,
        match_id: u128
    ) -> (MatchNFT, Future) {
        return (MatchNFT {
            owner: facilitator,
            match_id: match_id,
            original_owner: nft.owner,
            strength: nft.strength,
            speed: nft.speed,
            stamina: nft.stamina
        }, find_battle_f(match_id, self.caller));
    }

    async function find_battle_f(match_id: u128, caller: address) {
        // Make sure match_id is correct for MatchNFT record usage
        let cmi: u128 = current_match_id.get_or_use(0u128, 0u128);
        assert_eq(match_id, cmi);

        // Use nft_battle.aleo as null address
        let default_match_data: MatchData = MatchData {
            game_finished: false,
            player1: nft_battle.aleo,
            player2: nft_battle.aleo,
            attr_to_battle: 4u8, // there is no 4th attr
            winner: nft_battle.aleo
        };
        let match_data_local: MatchData = match_data.get_or_use(match_id, default_match_data);

        // If player 1 not exist, assign current player as player 1
        // else assign current player as player 2
        if (match_data_local.player1 == nft_battle.aleo) {
            match_data.set(match_id, MatchData {
                game_finished: false,
                player1: caller,
                player2: nft_battle.aleo,
                attr_to_battle: ChaCha::rand_u128().mod(3u128) as u8,
                winner: nft_battle.aleo
            });
        } else { 
            // Make sure not player 1 and player 2 are not same person
            assert_neq(caller, match_data_local.player1);
            match_data.set(match_id, MatchData {
                game_finished: false,
                player1: match_data_local.player1,
                player2: caller,
                attr_to_battle: match_data_local.attr_to_battle,
                winner: nft_battle.aleo
            });
        }
    }

    // To be called by facilitator
    async transition finish_game(
        md1: MatchNFT, 
        md2: MatchNFT, 
        attr_to_battle: u8
    ) -> (NFT, NFT, Future) {
        // Return the NFT to its owner
        let nft1: NFT = NFT {
            owner: md1.original_owner,
            strength: md1.strength,
            speed: md1.speed,
            stamina: md1.stamina
        };
        let nft2: NFT = NFT {
            owner: md2.original_owner,
            strength: md2.strength,
            speed: md2.speed,
            stamina: md2.stamina
        };

        // NOT WORKING AND CAUSING FAIL TRANSACTION: what is the work around on this?
        // Winner will always assigned with the value at the last branch
        let winner: address = nft_battle.aleo;
        if (attr_to_battle == 0u8) {
            winner = md1.strength > md2.strength? md1.original_owner : md2.original_owner;
        } else if (attr_to_battle == 1u8) {
            winner = md1.speed > md2.speed? md1.original_owner : md2.original_owner;
        } else if (attr_to_battle == 2u8) {
            winner = md1.stamina > md2.stamina? md1.original_owner : md2.original_owner;
        }
        return (nft1, nft2, finish_game_f(md1.match_id, winner, attr_to_battle));
    }

    async function finish_game_f(match_id: u128, winner: address, attr_to_battle: u8) {
        // Set match data to finished
        let match_data_local: MatchData = match_data.get(match_id);
        // Make sure battle the correct attribute
        assert_eq(match_data_local.attr_to_battle, attr_to_battle);

        match_data.set(0u128, MatchData {
            game_finished: true,
            player1: match_data_local.player1,
            player2: match_data_local.player2,
            attr_to_battle: attr_to_battle,
            winner: winner
        });

        // Move to next match
        current_match_id.set(0u128, current_match_id.get_or_use(0u128, 0u128) + 1u128);
    }
}

