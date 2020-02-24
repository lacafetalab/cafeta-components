 # Add the following 'help' target to your Makefile
 # And add help text after each target name starting with '\#\#'
 # A category can be added with @category

HELP_FUN = \
    	%help; \
        while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^(\w+)\s*:.*\#\#(?:@(\w+))?\s(.*)$$/ }; \
        print "usage: make [target]\n\n"; \
    	for (keys %help) { \
        print "$$_:\n"; $$sep = " " x (20 - length $$_->[0]); \
        print "  $$_->[0]$$sep$$_->[1]\n" for @{$$help{$$_}}; \
        print "\n"; }     

help:   ##@miscellaneous Show this help.
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)

include deploy/Makefile
