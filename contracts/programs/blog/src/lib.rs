use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("Ab5jcLYJ5dQUarijL1JuRJMMo321PzF9HEpf5Br1v95K");

#[error]
pub enum ErrorCode {
    #[msg("The provided topic should be 100 characters long maximum.")]
    TitleTooLong,
    #[msg("The provided content should be 2800 characters long maximum.")]
    ContentTooLong,
}

#[program]
pub mod blog {
    use super::*;

    pub fn create_post(
        ctx: Context<CreatePost>,
        title: String,
        banner_ipfs_hash: Vec<u8>,
        content_ipfs_hash: Vec<u8>,
    ) -> ProgramResult {
        if title.chars().count() > 100 {
            // Return a error...
            return Err(ErrorCode::TitleTooLong.into());
        }

        let blog_post = &mut ctx.accounts.blog_post;
        let authority = ctx.accounts.authority.key;
        let clock: Clock = Clock::get().unwrap();
        blog_post.title = title;
        blog_post.authority = *authority;
        blog_post.timestamp = clock.unix_timestamp;
        blog_post.banner_ipfs_hash = banner_ipfs_hash;
        blog_post.content_ipfs_hash = content_ipfs_hash;

        Ok(())
    }

    pub fn update_post(
        ctx: Context<UpdatePost>,
        title: String,
        banner_ipfs_hash: Vec<u8>,
        content_ipfs_hash: Vec<u8>,
    ) -> ProgramResult {
        let blog_post = &mut ctx.accounts.blog_post;
        blog_post.title = title;
        blog_post.banner_ipfs_hash = banner_ipfs_hash;
        blog_post.content_ipfs_hash = content_ipfs_hash;

        Ok(())
    }
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TITLE_LENGTH: usize = 100 * 4; // 100 chars max.
const MAX_CONTENT_LENGTH: usize = 2420 * 4; // 2800 chars max.
const MAX_URL_LENGTH: usize = 200 * 4;
const IPFS_HASH_LENGTH: usize = 32;

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(init,payer=authority,space=BlogPost::LEN)]
    pub blog_post: Account<'info, BlogPost>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePost<'info> {
    #[account(mut,has_one=authority)]
    pub blog_post: Account<'info, BlogPost>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
pub struct BlogPost {
    pub authority: Pubkey,
    pub timestamp: i64,
    pub title: String,
    pub banner_ipfs_hash: Vec<u8>,
    pub content_ipfs_hash: Vec<u8>,
}

impl BlogPost {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TITLE_LENGTH // Titile
        + IPFS_HASH_LENGTH // Banner
        + IPFS_HASH_LENGTH; // Content.
}
