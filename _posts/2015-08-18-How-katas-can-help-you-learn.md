---
layout: post
name: How-katas-can-help-you-learn
title: How katas can help you learn
date: 2015-08-18 09:35:00 +00:00
author: Ana Nogal
image:
    src: /assets/img/custom/blog/baton_long.jpg
    attribution:
        text: Baton_long by Alain Delmas
        href: https://commons.wikimedia.org/wiki/File:Baton_long.jpg
tags:
- Kata
- TDD
- iOS
- Objective-C
- Learning
---
In the last couple of weeks I have spent my time doing katas to improve my Objective-C. As you may remember, I even had an issue, [that you can revisit here](http://wp.me/p4i8Xl-7h).

I've learn a lot from other katas too: for instance the RomanNumerals kata... You think it's a simple one, that you wan't learn mush from. But it's a good exercise  for your red -> green -> refactor cycle. It's a simple algorithm nothing new will come from here... Wasn't I wrong!!!!!

I started  my kata, made tests then refactor. Add more tests and on the refactor phase, I decide to used an NSDictionary to map from a Decimal to a Roman number. Something like this:

```
NSDictionary *mapper = @{@10: @"X", @5:@"V", @1: @"I"};
```

That's when I discovered that the NSDictionary does not guarantee insertion order. What???? So my keys where all mixed up... And I needed them to maintain their order!!!! That's ok! I decided to create a class to map between decimals and romans. That's cool! Done! In the converter I just added a private property of type NSMutableArray. In it's constructor I added the class to the array all elements I needed. But now I have to do:

```
[[DecimalToRomanMapper alloc] initWithDecimal: AndRoman];
```
for every entry in the mapper. God!!!! So much work! Maybe that's why developers solve problems. They definitely don't like to do things by hand so they automate everything .
So I decided that I could create a factory method. I really didn't know how to create this factory method, so I just looked in apple docs. Here is another thing that I've learn. Even thought I knew that it existed, I never used it because I never needed to. But as I was in learning mode, I think I was more keen to seek for a different way to do it. When you are in a client, you don't have time to experiment new things. Having this time to learn new ways of doing things is really rewarding. So here is my class:

```
@interface DecimalToRomanMapper : NSObject

@property (nonatomic, assign, readonly) NSInteger decimal;
@property (nonatomic, copy, readonly) NSString* roman;

+ (instancetype)mappDecimal:(NSInteger)decimal ToRoman:(NSString*)roman;

@end
```

It's even more readable then the initialiser. And here is how I initialised it in my converter:

```
   self.mapper = @[
                      [DecimalToRomanMapper mappDecimal:1000 ToRoman:@"M"]
                  ];
```

So my class was looking pretty but then I look at my test class...it wasn't good:

```
...

- (void)testShouldConvertFourToIV {
    NSString *result = [converter convert:4];
   XCTAssertTrue([result isEqualToString:@"IV"]);
}

...

- (void)testShouldConvert1000ToM {
   NSString *result = [converter convert:1000];
    XCTAssertTrue([result isEqualToString:@"M"]);
}

...
```

So many tests. They remind me of the DRY principle. I really don't like to repeat myself. It's like a broken CD that doesn't move from the same music track... I've done the same kata in C# and my test class was all parameterised and I really liked it. After all this is a simple kata, right? ;).

```
(C# code)
[TestCase(1, "I")]
[TestCase(2, "II")]
[TestCase(3, "III")]
[TestCase(4, "IV")]
[TestCase(5, "V")]
[TestCase(9, "IX")]
[TestCase(10, "X")]
[TestCase(40, "XL")]
[TestCase(50, "L")]
[TestCase(90, "XC")]
[TestCase(100, "C")]
[TestCase(400, "CD")]
[TestCase(900, "CM")]
[TestCase(1000, "M")]
[TestCase(2499, "MMCDXCIX")]
[TestCase(3949, "MMMCMXLIX")]
public void convertDecimalToRoman(int decimalNumber, string expectedRomanNumber)
{
     var converter = new DecimalToRomanConverter();

      string result = converter.Convert(decimalNumber);

    Assert.AreEqual(expectedRomanNumber, result);
}
```
Well wouldn't it be nice if I could have that in Objective-C? Well, after some help from [Franzi](https://twitter.com/singsalad) I found a little [library](https://github.com/michalkonturek/XCParameterizedTestCase) that does it. You install the pod, you inherit from it and you create an array of inputs and expected values like this:

```
+ (NSArray *)testCaseData {
    return @[
             [XCTestCaseData createWithInputValue:@1 withExpectedValue:@"I"]
            ];
}
```

And then you just have to use the properties input and expected. So my test class looks like this:

```
@interface DecimalToRomanConverterTests : XCParameterizedTestCase

@end

@implementation DecimalToRomanConverterTests

+ (NSArray *)testCaseData {
    return @[
             [XCTestCaseData createWithInputValue:@1 withExpectedValue:@"I"],
             [XCTestCaseData createWithInputValue:@2 withExpectedValue:@"II"],
             [XCTestCaseData createWithInputValue:@3 withExpectedValue:@"III"],
             [XCTestCaseData createWithInputValue:@5 withExpectedValue:@"V"],
             [XCTestCaseData createWithInputValue:@8 withExpectedValue:@"VIII"],
             [XCTestCaseData createWithInputValue:@10 withExpectedValue:@"X"],
             [XCTestCaseData createWithInputValue:@18 withExpectedValue:@"XVIII"],
             [XCTestCaseData createWithInputValue:@4 withExpectedValue:@"IV"],
             [XCTestCaseData createWithInputValue:@9 withExpectedValue:@"IX"],
             [XCTestCaseData createWithInputValue:@50 withExpectedValue:@"L"],
             [XCTestCaseData createWithInputValue:@100 withExpectedValue:@"C"],
             [XCTestCaseData createWithInputValue:@500 withExpectedValue:@"D"],
             [XCTestCaseData createWithInputValue:@2499 withExpectedValue:@"MMCDXCIX"],
             [XCTestCaseData createWithInputValue:@3949 withExpectedValue:@"MMMCMXLIX"]
             ];
}

- (void)testShouldConvertADecimalIntoARoman {

    DecimalToRomanConverter *converter = [[DecimalToRomanConverter alloc]init];
    NSString* result = [converter convert:[self.input integerValue]];

    XCTAssertEqualObjects(self.expected, result);
}

```

Here is my final solution: [RomanNumerals](https://github.com/ananogal/RomanNumeralsKata).

So please don't underestimate what you can learn from a kata. They are a good opportunity to stretch your knowledge and add some more to it!
