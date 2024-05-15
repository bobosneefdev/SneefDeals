import * as filterRef from "./filters.js";
import { webhookUrls } from "../../common/secrets/webhook_links.js";

export const categories = {
    mens: {
        tops: {
            tShirts: {
                uri: "/mens/tops/t-shirts.html",
                webhookUrl: webhookUrls.zumiez.mens.tops.tShirts,
            },
            hoodies: {
                uri: "/mens/tops/hoodies.html",
                webhookUrl: webhookUrls.zumiez.mens.tops.hoodies,
            },
            shirts: {
                uri: "/mens/tops/shirts.html",
                webhookUrl: webhookUrls.zumiez.mens.tops.shirts,
            },
            sweaters: {
                uri: "/mens/tops/sweaters.html",
                webhookUrl: webhookUrls.zumiez.mens.tops.sweaters,
            },
            tankTops: {
                uri: "/mens/tops/tank-tops.html",
                webhookUrl: webhookUrls.zumiez.mens.tops.tankTops,
            },
            jackets: {
                uri: "/mens/outerwear/jackets.html",
                webhookUrl: webhookUrls.zumiez.mens.tops.jackets,
            },
            vests: {
                uri: "/mens/outerwear/vests.html",
                webhookUrl: webhookUrls.zumiez.mens.tops.vests,
            },
        },
        bottoms: {
            shorts: {
                uri: "/mens/bottoms/shorts.html",
                webhookUrl: webhookUrls.zumiez.mens.bottoms.shorts,
            },
            pants: {
                uri: "/mens/bottoms/pants.html",
                webhookUrl: webhookUrls.zumiez.mens.bottoms.pants,
            },
            jeans: {
                uri: "/mens/bottoms/jeans.html",
                webhookUrl: webhookUrls.zumiez.mens.bottoms.jeans,
            },
            overalls: {
                uri: "/mens/bottoms/overalls.html",
                webhookUrl: webhookUrls.zumiez.mens.bottoms.overalls,
            },
        },
        underwear: {
            uri: "/accessories/underwear.html",
            webhookUrl: webhookUrls.zumiez.mens.underwear,
            filterOverwrite: {
                bodyTypes: [filterRef.bodyTypes.mens],
            },
        },
        footwear: {
            socks: {
                uri: "/accessories/socks.html",
                webhookUrl: webhookUrls.zumiez.womens.footwear.socks,
                filterOverwrite: {
                    bodyTypes: [filterRef.bodyTypes.mens],
                },
            },
            sneakers: {
                uri: "/shoes/sneakers.html",
                webhookUrl: webhookUrls.zumiez.mens.footwear.sneakers,
                filterOverwrite: {
                    bodyTypes: [filterRef.bodyTypes.mens],
                },
            },
        },
    },
    womens: {
        tops: {
            tShirts: {
                uri: "/womens/tops/t-shirts.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.tShirts,
            },
            cropTops: {
                uri: "/womens/tops/crop-tops.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.cropTops,
            },
            hoodies: {
                uri: "/womens/tops/womens-hoodies.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.hoodies,
            },
            shirts: {
                uri: "/womens/tops/tops.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.shirts,
            },
            tankTops: {
                uri: "/womens/tops/tank-tops.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.tankTops,
            },
            sweaters: {
                uri: "/womens/tops/sweaters.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.sweaters,
            },
            bodySuits: {
                uri: "/womens/tops/bodysuits.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.bodySuits,
            },
            jackets: {
                uri: "/womens/outerwear/jackets.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.jackets,
            },
            dresses: {
                uri: "/womens/skirts-dresses/dresses.html",
                webhookUrl: webhookUrls.zumiez.womens.tops.dresses,
            },
        },
        bottoms: {
            pants: {
                uri: "/womens/bottoms/pants-and-leggings/pants.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.pants,
            },
            sweatPants: {
                uri: "/womens/bottoms/pants-and-leggings/sweatpants.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.sweatPants,
            },
            corduroyPants: {
                uri: "/womens/bottoms/pants-and-leggings/corduroy-pants.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.pants,
            },
            joggers: {
                uri: "/womens/bottoms/pants-and-leggings/joggers.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.pants,
            },
            overalls: {
                uri: "/womens/bottoms/pants-and-leggings/overalls.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.overalls,
            },
            trackPants: {
                uri: "/womens/bottoms/pants-and-leggings/track-pants.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.pants,
            },
            leggings: {
                uri: "/womens/bottoms/pants-and-leggings/leggings.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.leggings,
            },
            shorts: {
                uri: "/womens/bottoms/shorts.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.shorts,
            },
            jeans: {
                uri: "/womens/bottoms/jeans.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.jeans,
            },
            overalls2: {
                uri: "/womens/bottoms/overalls.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.overalls,
            },
            skirts: {
                uri: "/womens/skirts-dresses/skirts.html",
                webhookUrl: webhookUrls.zumiez.womens.bottoms.skirts,
            },
        },
        footwear: {
            socks: {
                uri: "/accessories/socks.html",
                webhookUrl: webhookUrls.zumiez.womens.footwear.socks,
                filterOverwrite: {
                    bodyTypes: [filterRef.bodyTypes.womens],
                },
            },
            sneakers: {
                uri: "/shoes/sneakers.html",
                webhookUrl: webhookUrls.zumiez.womens.footwear.sneakers,
                filterOverwrite: {
                    bodyTypes: [filterRef.bodyTypes.womens],
                },
            },
        },
        underwear: {
            bras: {
                uri: "/womens/intimates/bras.html",
                webhookUrl: webhookUrls.zumiez.womens.underwear.bras,
            },
            underwear: {
                uri: "/womens/intimates/undies.html",
                webhookUrl: webhookUrls.zumiez.womens.underwear.underwear,
            },
        },
    },
    other: {
        snow: {
            womens: {
                uri: "/womens/snow.html",
                webhookUrl: webhookUrls.zumiez.other.snow.womens,
            },
            mens: {
                uri: "/mens/snow.html",
                webhookUrl: webhookUrls.zumiez.other.snow.mens,
            },
            snow: {
                uri: "/snow.html",
                webhookUrl: webhookUrls.zumiez.other.snow.snow,
            },
        },
        swimwear: {
            womens: {
                uri: "/womens/swimwear.html",
                webhookUrl: webhookUrls.zumiez.other.swimwear.womens,
            },
            mens: {
                uri: "/mens/bottoms/shorts/swim.html",
                webhookUrl: webhookUrls.zumiez.other.swimwear.mens,
            },
        },
        skate: {
            completes: {
                uri: "/skate/completes.html",
                webhookUrl: webhookUrls.zumiez.other.skate.completes,
            },
            decks: {
                uri: "/skate/skateboard-decks.html",
                webhookUrl: webhookUrls.zumiez.other.skate.decks,
            },
            parts: {
                uri: "/skate/components.html",
                webhookUrl: webhookUrls.zumiez.other.skate.parts,
            },
            hardware: {
                uri: "/skate/skate-accessories.html",
                webhookUrl: webhookUrls.zumiez.other.skate.parts,
            },
        },
        accessories: {
            beanies: {
                uri: "/accessories/headwear/beanies.html",
                webhookUrl: webhookUrls.zumiez.other.accessories.beanies,
            },
            hats: {
                uri: "/accessories/headwear/hats.html",
                webhookUrl: webhookUrls.zumiez.other.accessories.hats,
            },
            belts: {
                uri: "/accessories/belts.html",
                webhookUrl: webhookUrls.zumiez.other.accessories.belts,
            },
            watches: {
                uri: "/accessories/watches-jewelry/watches.html",
                webhookUrl: webhookUrls.zumiez.other.accessories.watches,
            },
            jewelry: {
                womens: {
                    uri: "/accessories/watches-jewelry/jewelry.html",
                    webhookUrl:
                        webhookUrls.zumiez.other.accessories.jewelry.womens,
                    filterOverwrite: {
                        bodyTypes: [filterRef.bodyTypes.womens],
                    },
                },
                mens: {
                    uri: "/accessories/watches-jewelry/jewelry.html",
                    webhookUrl:
                        webhookUrls.zumiez.other.accessories.jewelry.mens,
                    filterOverwrite: {
                        bodyTypes: [filterRef.bodyTypes.mens],
                    },
                },
            },
            backpacks: {
                uri: "/accessories/backpacks-bags/backpacks.html",
                webhookUrl: webhookUrls.zumiez.other.accessories.bags,
            },
            bags: {
                uri: "/accessories/backpacks-bags/bags.html",
                webhookUrl: webhookUrls.zumiez.other.accessories.bags,
            },
            wallets: {
                uri: "/accessories/backpacks-bags/wallets.html",
                webhookUrl: webhookUrls.zumiez.other.accessories.wallets,
            },
        },
    },
};
