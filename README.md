Auto-generated device frames, downloaded and used by [fastlane frameit](https://fastlane.tools).

More information about this on the main repo: https://github.com/fastlane/fastlane/tree/master/frameit/frames_generator

## iPhone Duo

The iPhone Duo outer and inner display frames in Night Sky and Star White are
sourced from [Apple Design Resources](https://developer.apple.com/design/resources/).
Apple artwork remains subject to Apple's license supplied with the original
download; the repository's code license does not relicense that artwork.

Each display includes a grayscale screen mask referenced by its `offsets.json`
entry. These masks preserve asymmetric corners and the outer camera cutout.
Using Duo frames requires the device detection and screen-mask support in
[fastlane/fastlane#30458](https://github.com/fastlane/fastlane/pull/30458).

| Display | Screenshot size (portrait) | Frame size  | Screen offset |
| ------- | -------------------------- | ----------- | ------------- |
| Outer   | 1398 × 2034                | 1574 × 2194 | +88+80        |
| Inner   | 2007 × 2853                | 2247 × 3093 | +120+120      |

The portrait bezels are copied from Apple's `Outer Closed Portrait` and
`Inner Open Portrait` PNGs. Masks are generated from the Night Sky bezel alpha
channel: threshold to opaque, flood-fill the exterior white, invert, and crop
to the screenshot dimensions at the screen offset. Both finishes use the same
display geometry. Landscape uses frameit's existing rotation handling.
